export interface AlbumDto {
  id?: string;
  title: string;
  artist: string;
  coverArtUrl: string;
  releaseDate?: string;
  genre?: string;
  trackCount?: number;
  providerUrl?: string;
  itunesId?: string; // Sometimes provided directly, but we map it if needed
}

export interface AlbumSearchResponse {
  albums: AlbumDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface AlbumCreateRequest {
  itunesId?: string;
  title: string;
  artist: string;
  coverArtUrl: string;
  releaseDate?: string;
  genre?: string;
  trackCount?: number;
}

export interface SavedAlbumResponse {
  id: string;
  itunesId?: string;
  title: string;
  artist: string;
  coverArtUrl: string;
  releaseDate?: string;
  genre?: string;
  trackCount?: number;
  personalRating?: number;
  notes?: string;
  createdAt: string;
}
