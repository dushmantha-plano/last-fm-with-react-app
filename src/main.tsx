import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import * as React from 'react';
import { ApplicationState } from '@Store/index';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Store } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import Routes from './routes';

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

const Main: React.FC<MainProps> = ({ store, history }: MainProps) => (
  <Provider store={store}>
    <ReduxToastr
      timeOut={9000}
      newestOnTop={true}
      preventDuplicates={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick={true}
    />
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
);

export default Main;
