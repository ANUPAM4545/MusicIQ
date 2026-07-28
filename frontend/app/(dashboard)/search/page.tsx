"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { AlbumGrid } from "@/components/search/AlbumGrid";
import { SearchResultsHeader } from "@/components/search/SearchResultsHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useSearchAlbums } from "@/hooks/useSearchAlbums";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Music } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 500);
  
  const { data, isLoading, isError, error, refetch } = useSearchAlbums(debouncedTerm);

  const hasSearched = debouncedTerm.trim().length > 0;
  const hasResults = data && data.albums && data.albums.length > 0;

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4 text-center max-w-2xl mx-auto mt-4">
        <h2 className="text-3xl font-bold tracking-tight">Discover Music</h2>
        <p className="text-muted-foreground">
          Search for your favourite albums and artists to build your personal library.
        </p>
        <div className="pt-4 w-full">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search for an album or artist (e.g., 'Coldplay')"
          />
        </div>
      </div>

      <div className="mt-8">
        {!hasSearched && (
          <EmptyState 
            title="Search for Albums" 
            description="Type an artist name or album title in the search bar above to discover new music."
            icon={<Search size={48} />}
          />
        )}

        {hasSearched && isLoading && (
          <div className="space-y-6">
            <SearchResultsHeader term={debouncedTerm} total={0} />
            <AlbumGrid isLoading={true} skeletonCount={10} />
          </div>
        )}

        {hasSearched && isError && (
          <ErrorState 
            title="Search Failed" 
            message={(error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An error occurred while searching for albums. Please try again later."}
            onRetry={() => refetch()}
          />
        )}

        {hasSearched && !isLoading && !isError && hasResults && (
          <div className="space-y-6">
            <SearchResultsHeader term={debouncedTerm} total={data.total} />
            <AlbumGrid albums={data.albums} />
          </div>
        )}

        {hasSearched && !isLoading && !isError && !hasResults && (
          <EmptyState 
            title="No Results Found" 
            description={`We couldn't find any albums matching "${debouncedTerm}". Try a different search term.`}
            icon={<Music size={48} />}
          />
        )}
      </div>
    </div>
  );
}
