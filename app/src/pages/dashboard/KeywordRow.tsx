import { useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/constants";
import type { Keyword } from "@/types";

type Props = {
  keyword: Keyword;
  lang: string;
  onTranslationChange: (id: string, lang: string, value: string) => void;
  onKeyChange: (id: string, key: string) => void;
  onDelete: (id: string) => void;
};

export function KeywordRow({ keyword, lang, onTranslationChange, onKeyChange, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: keyword.id,
  });

  const [editingKey, setEditingKey] = useState(false);
  const [keyDraft, setKeyDraft] = useState(keyword.key);
  const inputRef = useRef<HTMLInputElement>(null);

  const translation = keyword.translations[lang] ?? "";
  const isMissing = !translation.trim();

  function startEdit() {
    setKeyDraft(keyword.key);
    setEditingKey(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  function commitEdit() {
    onKeyChange(keyword.id, keyDraft);
    setEditingKey(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") setEditingKey(false);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-0",
        isDragging ? "relative z-50 rounded-xl bg-white shadow-xl opacity-90" : "bg-transparent",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-gray-300 hover:text-gray-400 active:cursor-grabbing"
        tabIndex={-1}
      >
        <GripVertical size={18} />
      </button>

      <div className="flex min-w-[80px] flex-1 items-center gap-1">
        {editingKey ? (
          <>
            <input
              ref={inputRef}
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={commitEdit}
              className="flex-1 rounded-md border border-blue-300 bg-blue-50 px-2 py-0.5 text-sm font-medium text-gray-800 outline-none"
            />
            <button onClick={commitEdit} className="text-blue-500 hover:text-blue-700">
              <Check size={14} />
            </button>
          </>
        ) : (
          <>
            <span
              className={cn("text-sm font-medium", isMissing ? "text-red-400" : "text-gray-800")}
            >
              {keyword.key}
            </span>
            <button
              onClick={startEdit}
              className="cursor-pointer p-1.5 text-gray-300 transition-colors hover:text-gray-500"
            >
              <Pencil size={13} />
            </button>
          </>
        )}
      </div>

      <input
        value={translation}
        onChange={(e) => onTranslationChange(keyword.id, lang, e.target.value)}
        dir={LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr"}
        placeholder="..."
        className={cn(
          "w-40 rounded-lg border px-3 py-1.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-200",
          isMissing
            ? "border-red-300 bg-red-50 placeholder:text-red-300 focus:border-red-400"
            : "border-gray-200 bg-gray-50 placeholder:text-gray-300 focus:border-blue-300 focus:bg-white",
        )}
      />

      <button
        onClick={() => onDelete(keyword.id)}
        className="cursor-pointer p-1.5 text-gray-300 transition-colors hover:text-red-400"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
