import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useDeleteAlbum } from "@/hooks/useDeleteAlbum";
import { Loader2 } from "lucide-react";

interface DeleteAlbumDialogProps {
  albumId: string;
  albumTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}

export function DeleteAlbumDialog({ albumId, albumTitle, isOpen, onClose, onDeleted }: DeleteAlbumDialogProps) {
  const deleteMutation = useDeleteAlbum();

  const handleDelete = () => {
    deleteMutation.mutate(albumId, {
      onSuccess: () => {
        onClose();
        if (onDeleted) onDeleted();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Album</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove <strong>{albumTitle}</strong> from your library? This action cannot be undone and your personal rating and notes will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              "Remove Album"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
