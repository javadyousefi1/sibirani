import { z } from "zod";
import { storageGet, storageSet } from "@/lib/storage";
import { STORAGE_KEYS, PRESET_KEYWORDS } from "@/constants";
import type { AppState } from "@/types";

const AppStateSchema = z.object({
  keywords: z.array(
    z.object({
      id: z.string(),
      key: z.string(),
      translations: z.record(z.string(), z.string()),
    }),
  ),
  activeLanguage: z.string(),
});

function defaultState(): AppState {
  return { keywords: PRESET_KEYWORDS, activeLanguage: "en" };
}

export function loadState(): AppState {
  return storageGet(STORAGE_KEYS.APP_STATE, AppStateSchema) ?? defaultState();
}

export function saveState(state: AppState): void {
  storageSet(STORAGE_KEYS.APP_STATE, state);
}
