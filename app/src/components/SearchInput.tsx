import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = "Search..." }: Props) {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
