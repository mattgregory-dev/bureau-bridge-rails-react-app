export type ApiError = Error & {
  status: number;
  body: unknown;
};

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  const res = await fetch(path, {
    credentials: "include",
    ...options,
    headers,
  });

  if (!res.ok) {
    // try JSON error, fall back to text
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }

    const err = new Error("Request failed") as ApiError;
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return (await res.json()) as T;
}
