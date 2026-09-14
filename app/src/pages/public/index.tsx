import { useTranslations } from "@/contexts/TranslationsContext";
import { useKeywordSearch } from "@/hooks/useKeywordSearch";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SearchInput } from "@/components/SearchInput";
import { KeywordCard } from "./KeywordCard";

export default function PublicPage() {
  const { keywords, activeLanguage, setActiveLanguage } = useTranslations();
  const { query, setQuery, filtered, trimmedQuery } = useKeywordSearch(keywords);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Word Translations</h1>
          <LanguageSelector value={activeLanguage} onChange={setActiveLanguage} variant="outline" />
        </div>

        <div className="mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Search keywords..." />
        </div>

        <div className="space-y-3">
          {filtered.map((keyword) => (
            <KeywordCard key={keyword.id} keyword={keyword} lang={activeLanguage} />
          ))}
          {filtered.length === 0 && (
            <p className="mt-12 text-center text-sm text-gray-400">
              {trimmedQuery ? "No results found." : "No keywords available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
