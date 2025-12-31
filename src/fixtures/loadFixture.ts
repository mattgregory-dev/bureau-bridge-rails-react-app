export async function loadFixture<T = unknown>(filename: string): Promise<T> {
  const res = await fetch(`/fixtures/${encodeURIComponent(filename)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load fixture: ${filename} (${res.status})`);
  }

  return (await res.json()) as T;
}
