// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./index.d.ts'/>
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

import Main from './main';
import React from 'react';

import { createRoot } from 'react-dom/client';

const history = createBrowserHistory();
const store = configureStore(history);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Main store={store} history={history} />
  </React.StrictMode>,
);

serviceWorker.unregister();
