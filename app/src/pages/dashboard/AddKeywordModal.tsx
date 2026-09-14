import { useState } from "react";
import { LANGUAGES } from "@/constants";
import { Modal } from "@/components/Modal";

type Props = {
  onAdd: (key: string, lang: string, translation: string) => void;
  onClose: () => void;
};

export function AddKeywordModal({ onAdd, onClose }: Props) {
  const [key, setKey] = useState("");
  const [lang, setLang] = useState(LANGUAGES[0].code);
  const [translation, setTranslation] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedKey = key.trim();
    if (!trimmedKey) return;
    onAdd(trimmedKey, lang, translation.trim());
    onClose();
  }

  const selectedLang = LANGUAGES.find((l) => l.code === lang);

  return (
    <Modal title="Add Keyword" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
            Keyword
          </label>
          <input
            autoFocus
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. Save"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
            Language
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-gray-500">
            Translation
          </label>
          <input
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            dir={selectedLang?.dir}
            placeholder="Translation for this language"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={!key.trim()}
          className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          Add Keyword
        </button>
      </form>
    </Modal>
  );
}
