import type { Keyword } from "@/types";
import { LANGUAGES } from "@/constants";

type Props = {
  keyword: Keyword;
  lang: string;
};

export function KeywordCard({ keyword, lang }: Props) {
  const translation = keyword.translations[lang]?.trim();

  return (
    <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <p className="mb-1 text-base font-semibold text-gray-900">{keyword.key}</p>
      {translation ? (
        <p
          className="text-sm text-gray-600"
          dir={LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr"}
        >
          {translation}
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">No translation yet</p>
      )}
    </div>
  );
}
