export const queryKeys = {
  search: (term: string) => ['search', term] as const,
  library: ['library'] as const,
  album: (id: string) => ['album', id] as const,
  analytics: ['analytics'] as const,
};
