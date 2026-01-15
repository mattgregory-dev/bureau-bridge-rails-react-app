export type ApiError = { status: number; message: string };

export async function api<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    ...init
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // no body (204, etc)
  }

  if (!res.ok) {
    const message =
      data?.error ||
      (Array.isArray(data?.errors) ? data.errors.join(", ") : null) ||
      res.statusText;

    throw { status: res.status, message } satisfies ApiError;
  }

  return data as T;
}
