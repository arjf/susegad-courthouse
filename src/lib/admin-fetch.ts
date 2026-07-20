let csrfToken: string | null = null;
let fetchPromise: Promise<void> | null = null;

async function ensureToken() {
  if (csrfToken) return;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/auth/csrf-token")
    .then((r) => r.json())
    .then((data) => { csrfToken = data.token; });

  return fetchPromise;
}

export async function adminPost(url: string, body?: Record<string, unknown>): Promise<Response> {
  await ensureToken();

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken || "" },
    body: body ? JSON.stringify(body) : undefined,
  });
}
