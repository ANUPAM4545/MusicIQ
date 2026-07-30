import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export type SortOption = 'recent' | 'title' | 'artist' | 'rating' | 'genre';

interface LibraryToolbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  totalAlbums: number;
}

export function LibraryToolbar({ 
  searchTerm, 
  onSearchChange, 
  sortOption, 
  onSortChange,
  totalAlbums
}: LibraryToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b mb-6">
      <div className="flex items-center text-sm text-gray-500 font-medium">
        {totalAlbums} {totalAlbums === 1 ? 'album' : 'albums'} saved
      </div>
      
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <Input
            type="text"
            className="pl-9 w-full bg-white"
            placeholder="Search library..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="flex h-10 w-full sm:w-48 items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="recent">Recently Added</option>
          <option value="title">Album Title</option>
          <option value="artist">Artist</option>
          <option value="rating">Personal Rating</option>
          <option value="genre">Genre</option>
        </select>
      </div>
    </div>
  );
}
