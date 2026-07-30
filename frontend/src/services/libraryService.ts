import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { SavedAlbumResponse, AlbumUpdateRequest } from '@/types/library';

const getLibrary = async (): Promise<SavedAlbumResponse[]> => {
  const response = await api.get<ApiResponse<SavedAlbumResponse[]>>('/library/albums');
  return response.data.data;
};

const getAlbum = async (id: string): Promise<SavedAlbumResponse> => {
  const response = await api.get<ApiResponse<SavedAlbumResponse>>(`/library/albums/${id}`);
  return response.data.data;
};

const updateAlbum = async (id: string, request: AlbumUpdateRequest): Promise<SavedAlbumResponse> => {
  const response = await api.patch<ApiResponse<SavedAlbumResponse>>(`/library/albums/${id}`, request);
  return response.data.data;
};

const deleteAlbum = async (id: string): Promise<void> => {
  await api.delete<ApiResponse<void>>(`/library/albums/${id}`);
};

export const libraryService = {
  getLibrary,
  getAlbum,
  updateAlbum,
  deleteAlbum,
};
