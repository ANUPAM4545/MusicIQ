import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useUpdateAlbum } from '@/hooks/useUpdateAlbum';
import { Loader2 } from 'lucide-react';

interface NotesEditorProps {
  albumId: string;
  initialNotes?: string;
}

export function NotesEditor({ albumId, initialNotes = "" }: NotesEditorProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isEditing, setIsEditing] = useState(false);
  const updateMutation = useUpdateAlbum();

  // Reset local state if initialNotes changes from outside
  useEffect(() => {
    setNotes(initialNotes || "");
  }, [initialNotes]);

  const handleSave = () => {
    updateMutation.mutate(
      { id: albumId, data: { personalNotes: notes } },
      {
        onSuccess: () => {
          setIsEditing(false);
        }
      }
    );
  };

  const handleCancel = () => {
    setNotes(initialNotes || "");
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="w-full">
        {notes ? (
          <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700 whitespace-pre-wrap">
            {notes}
          </div>
        ) : (
          <div className="text-sm text-gray-400 italic">No notes added yet.</div>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(true)}
          className="mt-2"
        >
          {notes ? "Edit Notes" : "Add Notes"}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <textarea
        className="w-full h-32 p-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        placeholder="Add your personal thoughts, memories, or notes about this album..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        maxLength={1000}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{notes.length}/1000</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCancel} disabled={updateMutation.isPending}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
