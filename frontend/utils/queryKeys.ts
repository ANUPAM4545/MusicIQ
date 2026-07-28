export const queryKeys = {
  search: (term: string) => ['search', term] as const,
  library: ['library'] as const,
};
