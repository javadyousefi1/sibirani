import { LANGUAGES } from "@/constants";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (code: string) => void;
  variant?: "outline" | "ghost";
};

export function LanguageSelector({ value, onChange, variant = "ghost" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];

  function handleSelect(code: string) {
    onChange(code);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          variant === "outline"
            ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            : "text-gray-500 hover:text-gray-800",
        )}
      >
        {selected.label}
        <ChevronDown size={14} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50",
                  lang.code === value ? "font-semibold text-blue-600" : "text-gray-700",
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
