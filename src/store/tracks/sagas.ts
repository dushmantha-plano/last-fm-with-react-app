import { TrackActionTypes } from './types';
import {
  all,
  AllEffect,
  call,
  fork,
  ForkEffect,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  searchTrackErrorAction,
  searchTracksAction,
  searchTrackSuccessAction,
} from './actions';
import { searchTracks } from './utils/api';
import { toastr } from 'react-redux-toastr';

function* apiSearchTracks(action: ReturnType<typeof searchTracksAction>) {
  try {
    const res = yield call(searchTracks, action.payload);
    yield put(searchTrackSuccessAction(action.payload, res));
  } catch (err: any) {
    yield put(searchTrackErrorAction(err));
    toastr.error(
      'We couldnt get the required search',
      `Error trying to get: ${action.payload}`,
    );
  }
}

function* watchSelectTrack() {
  yield takeLatest(TrackActionTypes.SEARCH_TRACK, apiSearchTracks);
}

function* tracksSaga(): Generator<AllEffect<ForkEffect<void>>> {
  yield all([fork(watchSelectTrack)]);
}

export default tracksSaga;
