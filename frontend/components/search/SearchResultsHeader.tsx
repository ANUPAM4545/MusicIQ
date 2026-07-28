interface SearchResultsHeaderProps {
  term: string;
  total: number;
}

export function SearchResultsHeader({ term, total }: SearchResultsHeaderProps) {
  if (!term) return null;
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Results for <span className="text-primary">"{term}"</span>
      </h2>
      <p className="text-sm text-gray-500">
        {total} {total === 1 ? 'album' : 'albums'} found
      </p>
    </div>
  );
}
