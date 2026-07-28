import { SavedAlbumResponse } from './album';

export interface AlbumUpdateRequest {
  personalNotes?: string;
  personalRating?: number;
}

export type { SavedAlbumResponse };
