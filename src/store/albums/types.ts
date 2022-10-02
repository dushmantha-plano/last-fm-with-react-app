export interface Album {
  name: string;
  artist: string;
  id: number;
  url: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
  streamable: number;
}

export interface AlbumInfo {
  wiki: {
    content: string;
    published: string;
    summary: string;
  };
  name: string;
  artist: string;
  id: number;
  url: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
  releaseDate: Date;
  playcount: number;
  tracks: Track[];
}

export interface Track {
  name: string;
  duration: string;
  id: number;
  url: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
}

// export type ApiResponse = Record<string, any>

export enum AlbumsActionTypes {
  SEARCH_ALBUM = 'ALBUM/SEARCH_ALBUM',
  SEARCH_ALBUM_ERROR = 'ALBUM/SEARCH_ALBUM_ERROR',
  SEARCH_ALBUM_INFO = 'ALBUM/SEARCH_INFO_ALBUM',
  SEARCH_ALBUM_INFO_ERROR = 'ALBUM/SEARCH_ALBUM_INFO_ERROR',
  SEARCH_ALBUM_INFO_SUCCESS = 'ALBUM/SEARCH_ALBUM_INFO_SUCCESS',
  SEARCH_ALBUM_SUCCESS = 'ALBUM/SEARCH_ALBUM_SUCCESS',
  SORT_ALBUM = 'ALBUM/SORT_ALBUM',
  SORT_ALBUM_SUCCESS = 'ALBUM/SORT_ALBUM_SUCCESS',
}

export interface AlbumsState {
  readonly isSearchLoading: boolean;
  readonly infoCache: AlbumInfo | null;
  readonly topAlbumsSearchLoading: boolean;
  readonly isInfoSearchLoading: boolean;
  readonly searchCache: Album[];
  readonly errors?: string;
}
