import { RecentAlbumDto } from '@/types/analytics';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface RecentAlbumsListProps {
  albums: RecentAlbumDto[];
}

export function RecentAlbumsList({ albums }: RecentAlbumsListProps) {
  if (!albums || albums.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-400 py-8">
        No albums added recently
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {albums.slice(0, 5).map((album, index) => {
        const coverUrl = album.coverArtUrl ? album.coverArtUrl.replace("100x100bb", "200x200bb") : "";
        let timeAgo = "recently";
        try {
          if (album.addedDate) {
            timeAgo = formatDistanceToNow(new Date(album.addedDate), { addSuffix: true });
          }
        } catch {
          // fallback
        }
        
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
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate" title={album.title}>
                {album.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={album.artist}>
                {album.artist}
              </p>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
              {timeAgo}
            </div>
          </div>
        );
      })}
    </div>
  );
}
