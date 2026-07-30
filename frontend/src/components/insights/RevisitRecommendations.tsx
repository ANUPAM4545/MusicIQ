import { RevisitAlbumDto } from '@/types/insights';
import Image from 'next/image';
import { InsightBadge } from './InsightBadge';

interface RevisitRecommendationsProps {
  albums: RevisitAlbumDto[];
}

export function RevisitRecommendations({ albums }: RevisitRecommendationsProps) {
  if (!albums || albums.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 col-span-1 md:col-span-2 lg:col-span-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Recommended for Revisit</h3>
        <InsightBadge label="Recommended" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {albums.map((album, index) => {
          const coverUrl = album.coverArtUrl ? album.coverArtUrl.replace("100x100bb", "300x300bb") : "";
          
          return (
            <div key={`${album.title}-${index}`} className="flex flex-col gap-3 group">
              <div className="relative aspect-square w-full rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={`Cover for ${album.title}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate" title={album.title}>
                  {album.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={album.artist}>
                  {album.artist}
                </p>
                {album.reason && (
                  <p className="text-xs text-primary mt-1 line-clamp-2" title={album.reason}>
                    {album.reason}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
