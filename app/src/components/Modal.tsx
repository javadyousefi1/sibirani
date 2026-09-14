import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, onClose, children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
