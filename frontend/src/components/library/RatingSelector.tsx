import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUpdateAlbum } from '@/hooks/useUpdateAlbum';
import { Loader2 } from 'lucide-react';

interface RatingSelectorProps {
  albumId: string;
  initialRating?: number;
  readOnly?: boolean;
}

export function RatingSelector({ albumId, initialRating = 0, readOnly = false }: RatingSelectorProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const updateMutation = useUpdateAlbum();
  
  const currentRating = initialRating;
  const isUpdating = updateMutation.isPending;

  const handleRate = (rating: number) => {
    if (readOnly || isUpdating) return;
    updateMutation.mutate({ id: albumId, data: { personalRating: rating } });
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly || isUpdating}
          onClick={() => handleRate(star)}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          className={cn(
            "p-1 transition-colors rounded-sm",
            !readOnly && "hover:bg-gray-100",
            readOnly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              "w-6 h-6",
              (hoverRating || currentRating) >= star 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            )}
          />
        </button>
      ))}
      {isUpdating && <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-2" />}
    </div>
  );
}
