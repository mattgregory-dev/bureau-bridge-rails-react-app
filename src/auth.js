export async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    // try to return JSON error but fall back to text
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }
    const err = new Error("Request failed");
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return res.json();
}
