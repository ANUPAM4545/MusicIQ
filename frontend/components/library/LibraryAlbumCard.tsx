import Image from "next/image";
import { format } from "date-fns";
import { SavedAlbumResponse } from "@/types/library";
import { Star } from "lucide-react";

interface LibraryAlbumCardProps {
  album: SavedAlbumResponse;
  onClick: (album: SavedAlbumResponse) => void;
}

export function LibraryAlbumCard({ album, onClick }: LibraryAlbumCardProps) {
  const coverUrl = album.coverArtUrl ? album.coverArtUrl.replace("100x100bb", "600x600bb") : "";
  const year = album.releaseDate ? new Date(album.releaseDate).getFullYear() : "Unknown";
  const savedDate = format(new Date(album.createdAt), 'MMM d, yyyy');

  return (
    <div 
      onClick={() => onClick(album)}
      className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="aspect-square relative bg-gray-100 overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`Cover art for ${album.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        {/* Rating Badge Overlay */}
        {album.personalRating ? (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {album.personalRating}
          </div>
        ) : null}
      </div>
      
      <div className="flex flex-col p-4 flex-1">
        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors" title={album.title}>
          {album.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1" title={album.artist}>
          {album.artist}
        </p>
        
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>{album.genre || "Unknown"}</span>
          <span>{year}</span>
        </div>
        
        <div className="mt-auto pt-3 border-t mt-3 text-xs text-gray-400 flex items-center justify-between">
          <span>Added {savedDate}</span>
          {album.personalNotes && (
            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium">Notes</span>
          )}
        </div>
      </div>
    </div>
  );
}
