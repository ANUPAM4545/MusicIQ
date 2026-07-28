import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { AlbumSearchResponse, AlbumCreateRequest, SavedAlbumResponse } from '@/types/album';

const searchAlbums = async (term: string, limit: number = 50): Promise<AlbumSearchResponse> => {
  const response = await api.get<ApiResponse<AlbumSearchResponse>>('/albums/search', {
    params: { term, limit }
  });
  return response.data.data;
};

const saveAlbum = async (request: AlbumCreateRequest): Promise<SavedAlbumResponse> => {
  const response = await api.post<ApiResponse<SavedAlbumResponse>>('/library/albums', request);
  return response.data.data;
};

export const albumService = {
  searchAlbums,
  saveAlbum,
};
