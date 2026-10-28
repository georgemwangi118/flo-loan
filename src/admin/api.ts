import type { SiteContent } from "../content/types";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// CSRF token issued by auth.php; sent with every state-changing request.
let csrfToken = "";

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  const res = await fetch(url, {
    credentials: "same-origin",
    cache: "no-store",
    ...init,
    headers: {
      ...(init.body && !isForm ? { "Content-Type": "application/json" } : {}),
      "X-CSRF-Token": csrfToken,
      ...init.headers,
    },
  });

  let data: { success?: boolean; message?: string } & Record<string, unknown>;
  try {
    data = await res.json();
  } catch {
    throw new ApiError("The server sent an unexpected response. Is PHP running?", res.status);
  }
  if (!res.ok || data.success === false) {
    throw new ApiError(data.message || `Request failed (${res.status})`, res.status);
  }
  return data as T;
}

const post = <T>(url: string, body: unknown) =>
  request<T>(url, { method: "POST", body: JSON.stringify(body) });

export interface AuthStatus {
  authenticated: boolean;
  username: string | null;
  csrfToken: string;
  configured: boolean;
}

export interface Backup {
  id: string;
  savedAt: string | null;
  updatedBy: string | null;
}

export const api = {
  async status() {
    const data = await request<AuthStatus>("/api/auth.php");
    csrfToken = data.csrfToken;
    return data;
  },

  async login(username: string, password: string) {
    const data = await post<{ username: string; csrfToken: string }>("/api/auth.php", {
      action: "login",
      username,
      password,
    });
    csrfToken = data.csrfToken;
    return data;
  },

  async logout() {
    const data = await post<{ csrfToken: string }>("/api/auth.php", { action: "logout" });
    csrfToken = data.csrfToken;
  },

  changePassword: (currentPassword: string, newPassword: string) =>
    post("/api/auth.php", { action: "change-password", currentPassword, newPassword }),

  loadContent: () =>
    request<{ content: unknown; updatedAt: string | null }>("/api/content.php"),

  saveContent: (content: SiteContent) =>
    post<{ updatedAt: string }>("/api/content.php", { content }),

  uploadImage(file: File) {
    const form = new FormData();
    form.append("image", file);
    return request<{ url: string }>("/api/upload.php", { method: "POST", body: form });
  },

  listBackups: () => request<{ backups: Backup[] }>("/api/backups.php"),

  restoreBackup: (id: string) =>
    post<{ content: unknown; updatedAt: string }>("/api/backups.php", { id }),
};
