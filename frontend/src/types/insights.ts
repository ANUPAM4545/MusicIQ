export type InsightCategory = 'SUMMARY' | 'DIVERSITY' | 'BEHAVIOUR' | 'TREND' | 'HEALTH';

export interface InsightCardDto {
  title: string;
  description: string;
  icon: string;
  priority: string;
  category: InsightCategory;
}

export interface RevisitAlbumDto {
  title: string;
  artist: string;
  coverArtUrl: string;
  reason: string;
}

export interface CollectionHealthDto {
  score: number;
  title: string;
  description: string;
  ratedAlbumsScore: number;
  metadataCompletenessScore: number;
  genreDiversityScore: number;
  artistDiversityScore: number;
  collectionActivityScore: number;
}

export interface AiInsightsResponse {
  insights: InsightCardDto[];
  revisitSuggestions: RevisitAlbumDto[];
  collectionHealth: CollectionHealthDto;
}
