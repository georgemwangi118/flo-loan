import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, ExternalLink, LogOut, Save } from "lucide-react";
import { api, ApiError } from "./api";
import { mergeContent } from "../content/useContent";
import type { SiteContent } from "../content/types";
import {
  AboutEditor,
  ContactEditor,
  FooterEditor,
  GeneralEditor,
  HomeEditor,
  LegalEditor,
  LoansEditor,
  SlidesEditor,
} from "./editors";
import { AccountPanel, HistoryPanel, LoginScreen } from "./panels";
import { validateContent } from "./validation";

const sections = [
  { key: "loans", label: "Loan products" },
  { key: "slides", label: "Homepage slider" },
  { key: "home", label: "Homepage" },
  { key: "about", label: "About page" },
  { key: "contact", label: "Contact page" },
  { key: "general", label: "Contact & WhatsApp" },
  { key: "footer", label: "Footer" },
  { key: "terms", label: "Terms & Conditions" },
  { key: "privacy", label: "Privacy Policy" },
  { key: "history", label: "Version history" },
  { key: "account", label: "Account" },
] as const;

type Auth = { configured: boolean; username: string | null };

const AdminApp: React.FC = () => {
  const section = useParams()["*"] || "";
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saved, setSaved] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);
  const savedIds = useMemo(() => saved?.loans.map((l) => l.id) ?? [], [saved]);

  useEffect(() => {
    document.title = "Firefly Admin";
    api
      .status()
      .then((s) => setAuth({ configured: s.configured, username: s.authenticated ? s.username : null }))
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Could not reach the server."));
  }, []);

  // Load content once signed in. Kept across re-logins so an expired session never loses edits.
  useEffect(() => {
    if (!auth?.username || saved) return;
    api
      .loadContent()
      .then((data) => {
        const content = mergeContent(data.content);
        setSaved(content);
        setDraft(content);
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Could not load content."));
  }, [auth?.username, saved]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const handleAuthError = useCallback((err: unknown) => {
    if (err instanceof ApiError && err.status === 401) {
      setAuth((a) => (a ? { ...a, username: null } : a));
      return "Your session expired. Sign in again — your changes are still here.";
    }
    return err instanceof Error ? err.message : "Something went wrong.";
  }, []);

  const save = async () => {
    if (!draft) return;
    const problems = validateContent(draft);
    if (problems.length) {
      setNotice({ ok: false, text: problems.join(" ") });
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      await api.saveContent(draft);
      setSaved(draft);
      setNotice({ ok: true, text: "Saved. Your changes are now live on the website." });
    } catch (err) {
      setNotice({ ok: false, text: handleAuthError(err) });
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    if (dirty && !confirm("You have unsaved changes. Sign out anyway?")) return;
    await api.logout().catch(() => undefined);
    setSaved(null);
    setDraft(null);
    setAuth((a) => (a ? { ...a, username: null } : a));
  };

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 text-center">
        <div className="max-w-md space-y-2">
          <h1 className="text-lg font-semibold text-gray-900">The admin panel can’t reach the server</h1>
          <p className="text-sm text-gray-600">{loadError}</p>
        </div>
      </div>
    );
  }
  if (!auth) return <div className="min-h-screen bg-gray-100" />;
  if (!auth.username) {
    return <LoginScreen configured={auth.configured} onLoggedIn={(username) => setAuth({ ...auth, username })} />;
  }
  if (!draft) return <div className="min-h-screen bg-gray-100" />;
  if (!sections.some((s) => s.key === section)) return <Navigate to="/admin/loans" replace />;

  const set = <K extends keyof SiteContent>(key: K) => (value: SiteContent[K]) => {
    setDraft({ ...draft, [key]: value });
    setNotice(null);
  };

  const editor = (() => {
    switch (section) {
      case "general":
        return <GeneralEditor value={draft.general} onChange={set("general")} />;
      case "slides":
        return <SlidesEditor value={draft.slides} onChange={set("slides")} />;
      case "home":
        return <HomeEditor value={draft.home} onChange={set("home")} />;
      case "loans":
        return <LoansEditor value={draft.loans} onChange={set("loans")} savedIds={savedIds} />;
      case "about":
        return <AboutEditor value={draft.about} onChange={set("about")} />;
      case "contact":
        return <ContactEditor value={draft.contact} onChange={set("contact")} />;
      case "footer":
        return <FooterEditor value={draft.footer} onChange={set("footer")} />;
      case "terms":
        return <LegalEditor value={draft.terms} onChange={set("terms")} />;
      case "privacy":
        return <LegalEditor value={draft.privacy} onChange={set("privacy")} />;
      case "history":
        return (
          <HistoryPanel
            hasUnsavedChanges={dirty}
            onRestored={(content) => {
              const merged = mergeContent(content);
              setSaved(merged);
              setDraft(merged);
              setNotice({ ok: true, text: "Version restored. It is now live on the website." });
            }}
          />
        );
      case "account":
        return <AccountPanel />;
    }
  })();

  const current = sections.find((s) => s.key === section)!;
  const editsContent = section !== "history" && section !== "account";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/admin/loans" className="whitespace-nowrap font-bold">
            Firefly <span className="text-yellow-500">Admin</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {dirty && <span className="hidden text-sm text-amber-600 sm:inline">Unsaved changes</span>}
            <button
              type="button"
              onClick={() => {
                if (confirm("Discard all unsaved changes?")) setDraft(saved);
              }}
              disabled={!dirty || saving}
              className="hidden rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:hidden sm:block"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#FFD700] px-4 py-2 text-sm font-medium text-black hover:bg-[#e6c200] disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving…" : "Save changes"}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              title="View website"
            >
              <ExternalLink size={18} />
            </a>
            <button type="button" onClick={logout} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100" title="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:w-56 md:shrink-0 md:flex-col md:overflow-visible md:px-0">
          {sections.map((s) => (
            <Link
              key={s.key}
              to={`/admin/${s.key}`}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
                s.key === section ? "bg-white font-medium shadow-sm" : "text-gray-600 hover:bg-white/60"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <main className="min-w-0 flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{current.label}</h1>
          {notice && (
            <div
              className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                notice.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
              }`}
            >
              {notice.ok && <CheckCircle2 size={18} className="shrink-0" />}
              {notice.text}
            </div>
          )}
          {editsContent && (
            <p className="text-sm text-gray-500">
              Changes are only visible on the website after you click <strong>Save changes</strong>.
            </p>
          )}
          {editor}
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
