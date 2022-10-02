import { ApplicationState, createRootReducer, rootSaga } from './store';
import { History } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(
  history: History,
): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    {},
    composeEnhancers(
      responsiveStoreEnhancer,
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
