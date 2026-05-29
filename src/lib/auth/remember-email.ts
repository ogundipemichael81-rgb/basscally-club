export const REMEMBERED_EMAIL_STORAGE_KEY = "basscally_remembered_email";

const rememberedEmailListeners = new Set<() => void>();

export function subscribeRememberedEmail(onStoreChange: () => void): () => void {
  rememberedEmailListeners.add(onStoreChange);
  return () => {
    rememberedEmailListeners.delete(onStoreChange);
  };
}

function notifyRememberedEmailChange() {
  for (const listener of rememberedEmailListeners) {
    listener();
  }
}

export function getRememberedEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = localStorage.getItem(REMEMBERED_EMAIL_STORAGE_KEY);
    return value?.trim() || null;
  } catch {
    return null;
  }
}

export function getRememberedEmailSnapshot(): string {
  return getRememberedEmail() ?? "";
}

export function saveRememberedEmail(email: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(REMEMBERED_EMAIL_STORAGE_KEY, email.trim().toLowerCase());
    notifyRememberedEmailChange();
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }
}

export function clearRememberedEmail(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(REMEMBERED_EMAIL_STORAGE_KEY);
    notifyRememberedEmailChange();
  } catch {
    // Ignore storage failures.
  }
}
