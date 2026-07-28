import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { RatingSelector } from "./RatingSelector";
import { NotesEditor } from "./NotesEditor";
import { DeleteAlbumDialog } from "./DeleteAlbumDialog";
import { SavedAlbumResponse } from "@/types/library";
import { Trash2, Disc3 } from "lucide-react";

interface AlbumDetailModalProps {
  album: SavedAlbumResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AlbumDetailModal({ album, isOpen, onClose }: AlbumDetailModalProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!album) return null;

  const coverUrl = album.coverArtUrl ? album.coverArtUrl.replace("100x100bb", "600x600bb") : "";
  const releaseYear = album.releaseDate ? new Date(album.releaseDate).getFullYear() : "Unknown";
  const savedDate = format(new Date(album.createdAt), 'MMM d, yyyy');

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white sm:rounded-xl">
          <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto md:overflow-hidden">
            {/* Left side - Artwork */}
            <div className="w-full md:w-2/5 bg-gray-100 flex-shrink-0 flex items-center justify-center p-8 border-r">
              <div className="w-full aspect-square relative shadow-lg rounded-md overflow-hidden bg-white">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={`Cover art for ${album.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Disc3 size={64} className="mb-2 opacity-20" />
                    <span className="text-sm font-medium">No Artwork</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Details */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col md:overflow-y-auto">
              <div className="flex justify-between items-start mb-1 pr-8">
                <div>
                  <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 text-left">
                      {album.title}
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-lg text-gray-600 font-medium mt-1">{album.artist}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-gray-500 pb-6 border-b">
                <span>{album.genre || "Unknown Genre"}</span>
                <span>•</span>
                <span>{releaseYear}</span>
                {album.trackCount && (
                  <>
                    <span>•</span>
                    <span>{album.trackCount} tracks</span>
                  </>
                )}
                <span>•</span>
                <span>Added {savedDate}</span>
              </div>

              <div className="py-6 border-b">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Your Rating
                </h4>
                <RatingSelector albumId={album.id} initialRating={album.personalRating} />
              </div>

              <div className="py-6 flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Personal Notes
                </h4>
                <NotesEditor albumId={album.id} initialNotes={album.personalNotes} />
              </div>

              <div className="pt-6 mt-auto">
                <Button 
                  variant="destructive" 
                  className="w-full md:w-auto text-sm bg-red-50 hover:bg-red-100 hover:text-red-700 text-red-600 border border-red-200" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove from Library
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteAlbumDialog
        albumId={album.id}
        albumTitle={album.title}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDeleted={onClose}
      />
    </>
  );
}
