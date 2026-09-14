import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AppState, Keyword } from "@/types";
import { loadState, saveState } from "@/store/appState";

type TranslationsContextValue = {
  keywords: Keyword[];
  activeLanguage: string;
  setActiveLanguage: (lang: string) => void;
  updateTranslation: (id: string, lang: string, value: string) => void;
  updateKeywordKey: (id: string, key: string) => void;
  addKeyword: (key: string, lang: string, translation: string) => void;
  reorderKeywords: (newOrder: Keyword[]) => void;
  deleteKeyword: (id: string) => void;
  importKeywords: (keywords: Keyword[]) => void;
};

const TranslationsContext = createContext<TranslationsContextValue | null>(null);

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  function setActiveLanguage(lang: string) {
    setState((prev) => ({ ...prev, activeLanguage: lang }));
  }

  function updateTranslation(id: string, lang: string, value: string) {
    setState((prev) => ({
      ...prev,
      keywords: prev.keywords.map((kw) =>
        kw.id === id ? { ...kw, translations: { ...kw.translations, [lang]: value } } : kw,
      ),
    }));
  }

  function updateKeywordKey(id: string, key: string) {
    const trimmed = key.trim();
    if (!trimmed) return;
    setState((prev) => ({
      ...prev,
      keywords: prev.keywords.map((kw) => (kw.id === id ? { ...kw, key: trimmed } : kw)),
    }));
  }

  function addKeyword(key: string, lang: string, translation: string) {
    const id = crypto.randomUUID();
    const translations: Record<string, string> = { [lang]: translation };
    setState((prev) => ({
      ...prev,
      keywords: [...prev.keywords, { id, key, translations }],
    }));
  }

  function reorderKeywords(newOrder: Keyword[]) {
    setState((prev) => ({ ...prev, keywords: newOrder }));
  }

  function deleteKeyword(id: string) {
    setState((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((kw) => kw.id !== id),
    }));
  }

  function importKeywords(keywords: Keyword[]) {
    setState((prev) => ({ ...prev, keywords }));
  }

  return (
    <TranslationsContext.Provider
      value={{
        keywords: state.keywords,
        activeLanguage: state.activeLanguage,
        setActiveLanguage,
        updateTranslation,
        updateKeywordKey,
        addKeyword,
        reorderKeywords,
        deleteKeyword,
        importKeywords,
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const ctx = useContext(TranslationsContext);
  if (!ctx) throw new Error("useTranslations must be used within TranslationsProvider");
  return ctx;
}
