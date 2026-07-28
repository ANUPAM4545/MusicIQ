import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search for albums, artists..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <Search size={20} />
      </div>
      <Input
        type="text"
        className="block w-full pl-10 pr-10 py-6 text-lg rounded-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
