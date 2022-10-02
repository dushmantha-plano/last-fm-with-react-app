export interface Track {
  name: string;
  artist: string;
  id: number;
  url: string;
  image: {
    small: string;
    medium: string;
    large: string;
  };
  listeners: number;
}

export enum TrackActionTypes {
  SEARCH_TRACK = 'TRACK/SEARCH_TRACK',
  SEARCH_TRACK_ERROR = 'TRACK/SEARCH_TRACK_ERROR',
  SEARCH_TRACK_SUCCESS = 'TRACK/SEARCH_TRACK_SUCCESS',
}

export interface TrackState {
  readonly isSearchLoading: boolean;
  readonly searchCache: Track[];
  readonly errors?: string;
}
