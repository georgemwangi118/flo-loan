import React, { useEffect, useState } from "react";
import { History, Lock } from "lucide-react";
import { api, type Backup } from "./api";
import { Card, TextField } from "./fields";

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Something went wrong.");

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" }) : "Unknown date";

export const LoginScreen: React.FC<{ configured: boolean; onLoggedIn: (username: string) => void }> = ({
  configured,
  onLoggedIn,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api.login(username, password);
      onLoggedIn(data.username);
    } catch (err) {
      setError(errorText(err));
      setPassword("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-md">
        <div className="flex items-center gap-2">
          <Lock className="text-yellow-500" size={22} />
          <h1 className="text-xl font-bold text-gray-900">Firefly Admin</h1>
        </div>
        {!configured && (
          <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            The admin account hasn’t been set up on the server yet. See ADMIN.md.
          </p>
        )}
        <TextField label="Username" value={username} onChange={setUsername} />
        <div>
          <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || !username || !password}
          className="w-full rounded-lg bg-[#FFD700] py-2.5 font-medium text-black hover:bg-[#e6c200] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export const HistoryPanel: React.FC<{ hasUnsavedChanges: boolean; onRestored: (content: unknown) => void }> = ({
  hasUnsavedChanges,
  onRestored,
}) => {
  const [backups, setBackups] = useState<Backup[] | null>(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const load = () =>
    api
      .listBackups()
      .then((data) => setBackups(data.backups))
      .catch((err) => setError(errorText(err)));

  useEffect(() => {
    load();
  }, []);

  const restore = async (backup: Backup) => {
    const warning = hasUnsavedChanges ? "\n\nYour unsaved changes will be lost." : "";
    if (!confirm(`Restore the version saved on ${formatDate(backup.savedAt)}? It will go live immediately.${warning}`)) {
      return;
    }
    setBusyId(backup.id);
    setError("");
    try {
      const data = await api.restoreBackup(backup.id);
      onRestored(data.content);
      await load();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusyId("");
    }
  };

  return (
    <Card
      title="Version history"
      description="Every time you save, the previous version is kept here (last 30). Restoring a version makes it live straight away."
    >
      {error && <p className="text-sm text-red-600">{error}</p>}
      {backups === null && !error && <p className="text-sm text-gray-500">Loading…</p>}
      {backups?.length === 0 && <p className="text-sm text-gray-500">No earlier versions yet. They appear after your second save.</p>}
      <ul className="divide-y divide-gray-100">
        {backups?.map((backup) => (
          <li key={backup.id} className="flex items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-3 text-sm">
              <History size={16} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{formatDate(backup.savedAt)}</p>
                {backup.updatedBy && <p className="text-xs text-gray-500">by {backup.updatedBy}</p>}
              </div>
            </div>
            <button
              type="button"
              disabled={!!busyId}
              onClick={() => restore(backup)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
            >
              {busyId === backup.id ? "Restoring…" : "Restore"}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export const AccountPanel: React.FC = () => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 10) return setMessage({ ok: false, text: "New password must be at least 10 characters." });
    if (next !== repeat) return setMessage({ ok: false, text: "The new passwords don’t match." });
    setBusy(true);
    try {
      await api.changePassword(current, next);
      setMessage({ ok: true, text: "Password changed." });
      setCurrent("");
      setNext("");
      setRepeat("");
    } catch (err) {
      setMessage({ ok: false, text: errorText(err) });
    } finally {
      setBusy(false);
    }
  };

  const passwordInput = (id: string, label: string, value: string, set: (v: string) => void, autoComplete: string) => (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="password"
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
      />
    </div>
  );

  return (
    <Card title="Change password">
      <form onSubmit={submit} className="max-w-sm space-y-4">
        {passwordInput("pw-current", "Current password", current, setCurrent, "current-password")}
        {passwordInput("pw-new", "New password (at least 10 characters)", next, setNext, "new-password")}
        {passwordInput("pw-repeat", "Repeat new password", repeat, setRepeat, "new-password")}
        {message && <p className={`text-sm ${message.ok ? "text-green-700" : "text-red-600"}`}>{message.text}</p>}
        <button
          type="submit"
          disabled={busy || !current || !next}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Change password"}
        </button>
      </form>
    </Card>
  );
};
