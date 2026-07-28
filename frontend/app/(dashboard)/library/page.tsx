"use client";

import { useState, useMemo } from "react";
import { LibraryGrid } from "@/components/library/LibraryGrid";
import { LibraryToolbar, SortOption } from "@/components/library/LibraryToolbar";
import { AlbumDetailModal } from "@/components/library/AlbumDetailModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useLibrary } from "@/hooks/useLibrary";
import { SavedAlbumResponse } from "@/types/library";
import { Library, Music, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LibraryPage() {
  const { data: library, isLoading, isError, error, refetch } = useLibrary();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  
  const [selectedAlbum, setSelectedAlbum] = useState<SavedAlbumResponse | null>(null);

  // Client-side filtering and sorting
  const filteredAndSortedLibrary = useMemo(() => {
    if (!library) return [];
    
    // 1. Filter
    let result = library.filter((album) => {
      if (!searchTerm) return true;
      const lowerTerm = searchTerm.toLowerCase();
      return (
        album.title.toLowerCase().includes(lowerTerm) ||
        album.artist.toLowerCase().includes(lowerTerm) ||
        (album.genre && album.genre.toLowerCase().includes(lowerTerm))
      );
    });

    // 2. Sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "rating":
          const ratingA = a.personalRating || 0;
          const ratingB = b.personalRating || 0;
          return ratingB - ratingA; // Descending
        case "genre":
          return (a.genre || "").localeCompare(b.genre || "");
        default:
          return 0;
      }
    });

    return result;
  }, [library, searchTerm, sortOption]);

  const isEmpty = library && library.length === 0;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Your Library</h2>
        <p className="text-muted-foreground">
          Manage your saved albums, personal ratings, and notes.
        </p>
      </div>

      <div className="mt-4">
        {isLoading && (
          <LibraryGrid isLoading={true} onAlbumClick={() => {}} />
        )}

        {isError && (
          <ErrorState 
            title="Failed to Load Library" 
            message={(error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An error occurred while loading your library."}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && isEmpty && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 mt-8">
            <EmptyState 
              title="Your library is empty" 
              description="Start building your collection by searching for your favorite artists and albums."
              icon={<Library size={48} />}
            />
            <div className="flex justify-center mt-6">
              <Link href="/search">
                <Button>
                  <Music className="mr-2 h-4 w-4" />
                  Search Albums
                </Button>
              </Link>
            </div>
          </div>
        )}

        {library && !isLoading && !isError && !isEmpty && (
          <>
            <LibraryToolbar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortOption={sortOption}
              onSortChange={setSortOption}
              totalAlbums={library.length}
            />
            
            {filteredAndSortedLibrary.length === 0 ? (
              <EmptyState 
                title="No matches found" 
                description={`No albums in your library match "${searchTerm}".`}
                icon={<Search size={48} />}
              />
            ) : (
              <LibraryGrid 
                albums={filteredAndSortedLibrary} 
                onAlbumClick={setSelectedAlbum} 
              />
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AlbumDetailModal 
        album={selectedAlbum} 
        isOpen={!!selectedAlbum} 
        onClose={() => setSelectedAlbum(null)} 
      />
    </div>
  );
}
