export interface GenreAnalyticsDto {
  genre: string;
  count: number;
}

export interface RatingAnalyticsDto {
  rating: number;
  count: number;
}

export interface YearAnalyticsDto {
  year: string;
  count: number;
}

export interface TopAlbumDto {
  title: string;
  artist: string;
  rating: number;
  coverArtUrl: string;
}

export interface RecentAlbumDto {
  title: string;
  artist: string;
  coverArtUrl: string;
  addedDate: string;
}

export interface AnalyticsOverviewResponse {
  totalAlbums: number;
  totalUniqueArtists: number;
  totalGenres: number;
  averagePersonalRating: number;
  highestRatedAlbum: TopAlbumDto | null;
  recentlyAddedAlbumsCount: number;

  genreDistribution: GenreAnalyticsDto[];
  releaseYearDistribution: YearAnalyticsDto[];
  ratingDistribution: RatingAnalyticsDto[];

  topRatedAlbums: TopAlbumDto[];
  recentlyAddedAlbums: RecentAlbumDto[];
}
