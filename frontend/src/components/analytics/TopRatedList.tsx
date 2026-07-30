import { TopAlbumDto } from '@/types/analytics';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface TopRatedListProps {
  albums: TopAlbumDto[];
}

export function TopRatedList({ albums }: TopRatedListProps) {
  if (!albums || albums.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-400 py-8">
        No highly rated albums yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {albums.slice(0, 5).map((album, index) => {
        const coverUrl = album.coverArtUrl ? album.coverArtUrl.replace("100x100bb", "200x200bb") : "";
        
        return (
          <div key={`${album.title}-${index}`} className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
              {coverUrl ? (
                <Image
                  src={coverUrl}
                  alt={`Cover for ${album.title}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate" title={album.title}>
                {album.title}
              </h4>
              <p className="text-xs text-gray-500 truncate" title={album.artist}>
                {album.artist}
              </p>
            </div>
            <div className="flex items-center gap-1 font-medium text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{album.rating}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
