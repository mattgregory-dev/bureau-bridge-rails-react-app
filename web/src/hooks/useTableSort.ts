import { useMemo, useState } from "react";

export type SortDir = "asc" | "desc";

export function nextSortDir<K extends string>(
  currKey: K,
  key: K,
  currDir: SortDir
): SortDir {
  if (currKey !== key) return "desc";
  return currDir === "desc" ? "asc" : "desc";
}

export function cmp(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (typeof a === "number" && typeof b === "number") return a - b;

  const as = String(a);
  const bs = String(b);
  return as.localeCompare(bs, undefined, { numeric: true, sensitivity: "base" });
}

export function useTableSort<Row extends Record<string, any>, K extends keyof Row & string>(
  rows: Row[],
  initialKey: K,
  initialDir: SortDir = "desc"
) {
  const [sortKey, setSortKey] = useState<K>(initialKey);
  const [sortDir, setSortDir] = useState<SortDir>(initialDir);

  const sortedRows = useMemo(() => {
    const copy = [...rows];
    copy.sort((r1, r2) => {
      const c = cmp(r1[sortKey], r2[sortKey]);
      return sortDir === "asc" ? c : -c;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  function toggleSort(key: K) {
    const dir = nextSortDir(sortKey, key, sortDir);
    setSortKey(key);
    setSortDir(dir);
  }

  return { sortKey, sortDir, sortedRows, setSortKey, setSortDir, toggleSort };
}
