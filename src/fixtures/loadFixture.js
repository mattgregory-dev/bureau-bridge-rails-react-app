export async function loadFixture(filename) {
  const res = await fetch(`/fixtures/${filename}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load fixture: ${filename}`);
  return await res.json();
}
