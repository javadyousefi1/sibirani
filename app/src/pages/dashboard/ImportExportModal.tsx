import { useRef, useState } from "react";
import { Download, Upload, FileJson, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportKeywords, parseImportFile } from "@/lib/importExport";
import { Modal } from "@/components/Modal";
import type { Keyword } from "@/types";

type ImportState =
  | { stage: "idle" }
  | { stage: "preview"; keywords: Keyword[] }
  | { stage: "error"; message: string };

type Props = {
  keywords: Keyword[];
  onImport: (keywords: Keyword[]) => void;
  onClose: () => void;
};

export function ImportExportModal({ keywords, onImport, onClose }: Props) {
  const [importState, setImportState] = useState<ImportState>({ stage: "idle" });
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setImportState({ stage: "idle" });
    const result = await parseImportFile(file);
    if (result.ok) {
      setImportState({ stage: "preview", keywords: result.keywords });
    } else {
      setImportState({ stage: "error", message: result.error });
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleConfirmImport() {
    if (importState.stage !== "preview") return;
    onImport(importState.keywords);
    onClose();
  }

  const previewLanguages =
    importState.stage === "preview"
      ? [...new Set(importState.keywords.flatMap((kw) => Object.keys(kw.translations)))]
      : [];

  return (
    <Modal title="Import / Export" onClose={onClose}>
      {/* Export */}
      <div className="mb-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <p className="mb-1 text-sm font-medium text-gray-700">Export</p>
        <p className="mb-3 text-xs text-gray-400">
          Download all {keywords.length} keywords as a JSON file.
        </p>
        <button
          onClick={() => exportKeywords(keywords)}
          disabled={keywords.length === 0}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download size={15} />
          Download JSON
        </button>
      </div>

      {/* Import */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
        <p className="mb-1 text-sm font-medium text-gray-700">Import</p>
        <p className="mb-3 text-xs text-gray-400">
          Replace current keywords with data from a JSON file.
        </p>

        {importState.stage !== "preview" && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 transition-colors",
              dragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40",
            )}
          >
            <FileJson size={28} className={dragging ? "text-blue-400" : "text-gray-300"} />
            <p className="text-sm text-gray-500">
              Drop a JSON file here, or <span className="text-blue-500">browse</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>
        )}

        {importState.stage === "error" && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {importState.message}
          </div>
        )}

        {importState.stage === "preview" && (
          <div className="space-y-3">
            <div className="flex items-start gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">File looks valid</p>
                <p className="mt-0.5 text-xs text-green-600">
                  {importState.keywords.length} keywords · {previewLanguages.join(", ")}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              This will <span className="font-medium text-gray-600">replace</span> all current keywords.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setImportState({ stage: "idle" })}
                className="flex-1 cursor-pointer rounded-lg border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImport}
                className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Upload size={14} />
                Import
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
