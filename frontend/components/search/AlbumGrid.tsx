import { AlbumDto } from "@/types/album";
import { AlbumCard } from "./AlbumCard";
import { AlbumSkeleton } from "./AlbumSkeleton";

interface AlbumGridProps {
  albums?: AlbumDto[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function AlbumGrid({ albums = [], isLoading = false, skeletonCount = 10 }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {isLoading ? (
        Array.from({ length: skeletonCount }).map((_, i) => (
          <AlbumSkeleton key={`skeleton-${i}`} />
        ))
      ) : (
        albums.map((album) => (
          <AlbumCard key={album.itunesId || album.id} album={album} />
        ))
      )}
    </div>
  );
}
