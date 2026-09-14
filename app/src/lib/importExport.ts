import { z } from "zod";
import { safeParse } from "./storage";
import type { Keyword } from "@/types";

const ImportSchema = z.object({
  keywords: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
      translations: z.record(z.string(), z.string()),
    }),
  ),
});

export type ImportResult =
  | { ok: true; keywords: Keyword[] }
  | { ok: false; error: string };

export function exportKeywords(keywords: Keyword[]): void {
  const data = JSON.stringify({ keywords }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `translations-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImportFile(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    if (!file.name.endsWith(".json")) {
      resolve({ ok: false, error: "Only .json files are supported." });
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const raw = e.target?.result;
      if (typeof raw !== "string") {
        resolve({ ok: false, error: "Could not read file." });
        return;
      }

      const parsed = safeParse<unknown>(raw);
      if (!parsed) {
        resolve({ ok: false, error: "Invalid JSON file." });
        return;
      }

      const result = ImportSchema.safeParse(parsed);
      if (!result.success) {
        resolve({ ok: false, error: "File format does not match expected schema." });
        return;
      }

      resolve({ ok: true, keywords: result.data.keywords });
    };

    reader.onerror = () => resolve({ ok: false, error: "Failed to read file." });
    reader.readAsText(file);
  });
}
