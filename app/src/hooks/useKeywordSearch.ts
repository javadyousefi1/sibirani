import { useMemo, useState } from "react";
import type { Keyword } from "@/types";

export function useKeywordSearch(keywords: Keyword[]) {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (trimmedQuery ? keywords.filter((kw) => kw.key.toLowerCase().includes(trimmedQuery)) : keywords),
    [keywords, trimmedQuery],
  );

  return { query, setQuery, filtered, trimmedQuery };
}
