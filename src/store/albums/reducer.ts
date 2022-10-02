import { AlbumsActionTypes, AlbumsState } from './types';
import { Reducer } from 'redux';

export const initialState: AlbumsState = {
  errors: '',
  infoCache: null,
  isInfoSearchLoading: false,
  searchCache: [],
  isSearchLoading: false,
  topAlbumsSearchLoading: false,
};

const reducer: Reducer<AlbumsState> = (
  state: AlbumsState = initialState,
  action,
): AlbumsState => {
  switch (action.type) {
    case AlbumsActionTypes.SEARCH_ALBUM: {
      return {
        ...state,
        searchCache: [],
        isSearchLoading: true,
      };
    }
    case AlbumsActionTypes.SEARCH_ALBUM_SUCCESS: {
      const searchCache = action.payload.data;
      return {
        ...state,
        searchCache,
        isSearchLoading: false,
      };
    }
    case AlbumsActionTypes.SEARCH_ALBUM_ERROR: {
      return {
        ...state,
        errors: action.payload,
        searchCache: [],
        isSearchLoading: false,
      };
    }
    case AlbumsActionTypes.SEARCH_ALBUM_INFO: {
      return {
        ...state,
        infoCache: null,
        isInfoSearchLoading: true,
      };
    }
    case AlbumsActionTypes.SEARCH_ALBUM_INFO_SUCCESS: {
      const infoCache = action.payload.data;
      return {
        ...state,
        infoCache,
        isInfoSearchLoading: false,
      };
    }
    case AlbumsActionTypes.SEARCH_ALBUM_INFO_ERROR: {
      return {
        ...state,
        errors: action.payload,
        infoCache: null,
        isInfoSearchLoading: false,
      };
    }
    case AlbumsActionTypes.SORT_ALBUM: {
      return {
        ...state,
        isSearchLoading: true,
      };
    }
    case AlbumsActionTypes.SORT_ALBUM_SUCCESS: {
      const searchCache = action.payload;
      return {
        ...state,
        searchCache,
        isSearchLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as albumReducer };
