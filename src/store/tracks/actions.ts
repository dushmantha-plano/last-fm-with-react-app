import { Track, TrackActionTypes } from './types';
import { action } from 'typesafe-actions';

export const searchTracksAction = (
  track: string,
): { type: TrackActionTypes.SEARCH_TRACK; payload: string } =>
  action(TrackActionTypes.SEARCH_TRACK, track);

export const searchTrackSuccessAction = (
  track: string,
  data: Track[],
): {
  type: TrackActionTypes.SEARCH_TRACK_SUCCESS;
  payload: { track: string; data: Track[] };
} => action(TrackActionTypes.SEARCH_TRACK_SUCCESS, { track, data });

export const searchTrackErrorAction = (
  message: string,
): {
  type: TrackActionTypes.SEARCH_TRACK_ERROR;
  payload: string;
} => action(TrackActionTypes.SEARCH_TRACK_ERROR, message);
