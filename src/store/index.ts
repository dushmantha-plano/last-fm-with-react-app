import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';
import { IBrowser, responsiveStateReducer } from 'redux-responsive';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';
import { AlbumsState } from './albums/types';
import { TrackState } from './tracks/types';
import { History } from 'history';
import { albumReducer } from './albums/reducer';
import { trackReducer } from './tracks/reducer';
import { combineReducers } from 'redux';
import albumsSaga from './albums/sagas';
import tracksSaga from './tracks/sagas';

export interface ApplicationState {
  albums: AlbumsState;
  router: RouterState;
  browser: IBrowser;
  toastr: ToastrState;
  tracks: TrackState;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRootReducer = (history: History) =>
  combineReducers({
    tracks: trackReducer,
    albums: albumReducer,
    browser: responsiveStateReducer,
    router: connectRouter(history),
    toastr: toastrReducer,
  });

export function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(albumsSaga), fork(tracksSaga)]);
}
