import { AlbumsActionTypes } from './types';
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
  searchAlbumErrorAction,
  searchAlbumInfoAction,
  searchAlbumInfoErrorAction,
  searchAlbumInfoSuccessAction,
  searchAlbumsAction,
  searchAlbumSuccessAction,
  sortAlbumsBy,
  sortAlbumsBySuccess,
} from './actions';
import { searchAlbumInfo, searchAlbums } from './utils/api';
import { sortAlbums } from './utils/help';
import { toastr } from 'react-redux-toastr';

function* apiSearchAlbums(action: ReturnType<typeof searchAlbumsAction>) {
  try {
    const res = yield call(searchAlbums, action.payload);
    yield put(searchAlbumSuccessAction(action.payload, res));
  } catch (err: any) {
    yield put(searchAlbumErrorAction(err));
    toastr.error(
      'We couldnt get result',
      `Error trying to get: ${action.payload}`,
    );
  }
}

function* apiSearchAlbumInfo(action: ReturnType<typeof searchAlbumInfoAction>) {
  try {
    const res = yield call(
      searchAlbumInfo,
      action.payload.album,
      action.payload.artist,
    );
    yield put(searchAlbumInfoSuccessAction(action.payload.artist, res));
  } catch (err: any) {
    yield put(searchAlbumInfoErrorAction(err));
    toastr.error(
      'We couldnt get the required artist',
      `Error trying to get: ${action.payload.artist}`,
    );
  }
}

function* sortAlbumsAsPerRequest(action: ReturnType<typeof sortAlbumsBy>) {
  try {
    const res = yield call(
      sortAlbums,
      action.payload.data,
      action.payload.sortBy,
    );
    yield put(sortAlbumsBySuccess(res));
  } catch (err: any) {
    yield put(searchAlbumErrorAction(err));
    toastr.error(
      'We couldnt get the required search',
      `Error trying to get: ${action.payload}`,
    );
  }
}

function* watchSelectAlbum() {
  yield takeLatest(AlbumsActionTypes.SEARCH_ALBUM, apiSearchAlbums);
}

function* watchSelectAlbumInfo() {
  yield takeLatest(AlbumsActionTypes.SEARCH_ALBUM_INFO, apiSearchAlbumInfo);
}

function* watchSortAlbums() {
  yield takeLatest(AlbumsActionTypes.SORT_ALBUM, sortAlbumsAsPerRequest);
}

function* albumsSaga(): Generator<AllEffect<ForkEffect<void>>> {
  yield all([
    fork(watchSelectAlbum),
    fork(watchSelectAlbumInfo),
    fork(watchSortAlbums),
  ]);
}

export default albumsSaga;
