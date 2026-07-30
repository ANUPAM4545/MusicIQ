import { AlbumDto } from "@/types/album";
import { Button } from "@/components/ui/Button";
import { Save, Check, Loader2 } from "lucide-react";
import { useSaveAlbum } from "@/hooks/useSaveAlbum";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

interface AlbumCardProps {
  album: AlbumDto;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const saveMutation = useSaveAlbum();
  const [isSaved, setIsSaved] = useState(false);

  // Extract high-res image if possible from iTunes URL
  const coverUrl = album.coverArtUrl ? album.coverArtUrl.replace("100x100bb", "600x600bb") : "";
  const year = album.releaseDate ? new Date(album.releaseDate).getFullYear() : "Unknown";

  const handleSave = () => {
    saveMutation.mutate(
      {
        itunesId: album.itunesId || album.id, // Fallback to id if itunesId isn't specifically set
        title: album.title,
        artist: album.artist,
        coverArtUrl: coverUrl || album.coverArtUrl,
        releaseDate: album.releaseDate,
        genre: album.genre,
        trackCount: album.trackCount,
      },
      {
        onSuccess: () => {
          setIsSaved(true);
          toast.success(`${album.title} added to library!`);
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          const message = err.response?.data?.message || "Failed to save album";
          if (message.toLowerCase().includes("conflict") || message.toLowerCase().includes("already exists")) {
             toast.error(`${album.title} is already in your library.`);
             setIsSaved(true);
          } else {
             toast.error(message);
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square relative bg-gray-100 overflow-hidden group">
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
      </div>
      <div className="flex flex-col p-4 flex-1">
        <h3 className="font-semibold text-base line-clamp-1" title={album.title}>
          {album.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1" title={album.artist}>
          {album.artist}
        </p>
        
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>{album.genre || "Unknown Genre"}</span>
          <span>{year}</span>
        </div>
        {album.trackCount && (
          <p className="text-xs text-gray-400 mt-1">{album.trackCount} tracks</p>
        )}
        
        <div className="pt-4 mt-auto">
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending || isSaved}
            className="w-full"
            variant={isSaved ? "secondary" : "default"}
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save to Library
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
