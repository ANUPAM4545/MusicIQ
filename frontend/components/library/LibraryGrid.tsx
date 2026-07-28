import { SavedAlbumResponse } from "@/types/library";
import { LibraryAlbumCard } from "./LibraryAlbumCard";
import { LibrarySkeleton } from "./LibrarySkeleton";

interface LibraryGridProps {
  albums?: SavedAlbumResponse[];
  isLoading?: boolean;
  onAlbumClick: (album: SavedAlbumResponse) => void;
  skeletonCount?: number;
}

export function LibraryGrid({ albums = [], isLoading = false, onAlbumClick, skeletonCount = 10 }: LibraryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {isLoading ? (
        Array.from({ length: skeletonCount }).map((_, i) => (
          <LibrarySkeleton key={`skeleton-${i}`} />
        ))
      ) : (
        albums.map((album) => (
          <LibraryAlbumCard 
            key={album.id} 
            album={album} 
            onClick={onAlbumClick} 
          />
        ))
      )}
    </div>
  );
}
