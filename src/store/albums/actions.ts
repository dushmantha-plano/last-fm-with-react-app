import { Album, AlbumInfo, AlbumsActionTypes } from './types';
import { action } from 'typesafe-actions';

export const searchAlbumsAction = (
  album: string,
): { type: AlbumsActionTypes.SEARCH_ALBUM; payload: string } =>
  action(AlbumsActionTypes.SEARCH_ALBUM, album);

export const searchAlbumSuccessAction = (
  album: string,
  data: Album[],
): {
  type: AlbumsActionTypes.SEARCH_ALBUM_SUCCESS;
  payload: { album: string; data: Album[] };
} => action(AlbumsActionTypes.SEARCH_ALBUM_SUCCESS, { album, data });

export const searchAlbumErrorAction = (
  message: string,
): {
  type: AlbumsActionTypes.SEARCH_ALBUM_ERROR;
  payload: string;
} => action(AlbumsActionTypes.SEARCH_ALBUM_ERROR, message);

// -----------------------------------------------------------------------------
export const searchAlbumInfoAction = (
  album: string,
  artist: string,
): {
  type: AlbumsActionTypes.SEARCH_ALBUM_INFO;
  payload: { artist: string; album: string };
} => action(AlbumsActionTypes.SEARCH_ALBUM_INFO, { artist, album });

export const searchAlbumInfoSuccessAction = (
  album: string,
  data: AlbumInfo,
): {
  type: AlbumsActionTypes.SEARCH_ALBUM_INFO_SUCCESS;
  payload: { album: string; data: AlbumInfo };
} => action(AlbumsActionTypes.SEARCH_ALBUM_INFO_SUCCESS, { album, data });

export const searchAlbumInfoErrorAction = (
  message: string,
): {
  type: AlbumsActionTypes.SEARCH_ALBUM_INFO_ERROR;
  payload: string;
} => action(AlbumsActionTypes.SEARCH_ALBUM_INFO_ERROR, message);

// -----------------------------------------------------------------------------
export const sortAlbumsBy = (
  sortBy: string,
  data: Album[],
): {
  type: AlbumsActionTypes.SORT_ALBUM;
  payload: { data: Album[]; sortBy: string };
} => action(AlbumsActionTypes.SORT_ALBUM, { data, sortBy });

export const sortAlbumsBySuccess = (
  data: Album[],
): {
  type: AlbumsActionTypes.SORT_ALBUM_SUCCESS;
  payload: Album[];
} => action(AlbumsActionTypes.SORT_ALBUM_SUCCESS, data);
