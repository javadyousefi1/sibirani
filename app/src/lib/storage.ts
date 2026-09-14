import type { z } from "zod";

export function safeParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function storageGet<T>(key: string, schema: z.ZodType<T>): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const parsed = safeParse<unknown>(raw);
  if (parsed === null) return null;
  const result = schema.safeParse(parsed);
  return result.success ? result.data : null;
}

export function storageSet(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}
