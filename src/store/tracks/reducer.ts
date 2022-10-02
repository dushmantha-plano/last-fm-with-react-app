import { TrackActionTypes, TrackState } from './types';
import { Reducer } from 'redux';

export const initialState: TrackState = {
  errors: '',
  searchCache: [],
  isSearchLoading: false,
};

const reducer: Reducer<TrackState> = (
  state: TrackState = initialState,
  action,
): TrackState => {
  switch (action.type) {
    case TrackActionTypes.SEARCH_TRACK: {
      return {
        ...state,
        searchCache: [],
        isSearchLoading: true,
      };
    }
    case TrackActionTypes.SEARCH_TRACK_SUCCESS: {
      const searchCache = action.payload.data;
      return {
        ...state,
        searchCache,
        isSearchLoading: false,
      };
    }
    case TrackActionTypes.SEARCH_TRACK_ERROR: {
      return {
        ...state,
        errors: action.payload,
        searchCache: [],
        isSearchLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as trackReducer };
