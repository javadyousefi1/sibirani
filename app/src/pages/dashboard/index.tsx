import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Plus, ArrowLeftRight } from "lucide-react";
import { useTranslations } from "@/contexts/TranslationsContext";
import { useModal } from "@/hooks/useModal";
import { useKeywordSearch } from "@/hooks/useKeywordSearch";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SearchInput } from "@/components/SearchInput";
import { KeywordRow } from "./KeywordRow";
import { AddKeywordModal } from "./AddKeywordModal";
import { ImportExportModal } from "./ImportExportModal";

export default function DashboardPage() {
  const {
    keywords,
    activeLanguage,
    setActiveLanguage,
    updateTranslation,
    updateKeywordKey,
    addKeyword,
    reorderKeywords,
    deleteKeyword,
    importKeywords,
  } = useTranslations();
  const addKeywordModal = useModal();
  const importExportModal = useModal();
  const { query, setQuery, filtered, trimmedQuery } = useKeywordSearch(keywords);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const sortableItems = useMemo(() => filtered.map((k) => k.id), [filtered]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || trimmedQuery) return;
    const oldIndex = keywords.findIndex((k) => k.id === active.id);
    const newIndex = keywords.findIndex((k) => k.id === over.id);
    reorderKeywords(arrayMove(keywords, oldIndex, newIndex));
  }

  return (
    <div className="px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Translation Management</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={importExportModal.open}
              className="cursor-pointer flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-gray-700"
            >
              <ArrowLeftRight size={13} />
              Import / Export
            </button>
            <LanguageSelector value={activeLanguage} onChange={setActiveLanguage} />
          </div>
        </div>

        <div className="mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Search keywords..." />
        </div>

        <div className="rounded-2xl bg-white shadow-sm">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortableItems}
              strategy={verticalListSortingStrategy}
            >
              {filtered.map((keyword) => (
                <KeywordRow
                  key={keyword.id}
                  keyword={keyword}
                  lang={activeLanguage}
                  onTranslationChange={updateTranslation}
                  onKeyChange={updateKeywordKey}
                  onDelete={deleteKeyword}
                />
              ))}
            </SortableContext>
          </DndContext>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-gray-400">
              {trimmedQuery ? "No results found." : "No keywords yet. Add one below."}
            </p>
          )}
        </div>

        <button
          onClick={addKeywordModal.open}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white shadow transition-colors hover:bg-blue-700 active:scale-[0.98]"
        >
          <Plus size={20} />
          Add Keyword
        </button>
      </div>

      {addKeywordModal.isOpen && (
        <AddKeywordModal onAdd={addKeyword} onClose={addKeywordModal.close} />
      )}

      {importExportModal.isOpen && (
        <ImportExportModal
          keywords={keywords}
          onImport={importKeywords}
          onClose={importExportModal.close}
        />
      )}
    </div>
  );
}
