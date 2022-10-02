import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import AlbumInfo from '@Views/Album/AlbumInfo';
import AlbumSearch from '@Views/Album/AlbumSearch';
import TrackSearch from '@Views/Track/TrackSearch';
import Body from '@Components/Body';
import Header from '@Components/Header';
import styled from 'styled-components';

const Routes: React.FunctionComponent = () => (
  <Root>
    <Header />
    <Redirect from="/" to="/albums" />
    <Body>
      <Scrollbars
        autoHide={true}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'grey',
              marginLeft: '0',
              marginRight: '0',
            }}
          />
        )}
      >
        <Switch>
          <Route path="/" exact={true} component={AlbumSearch} />
          <Route path="/albums" exact={true} component={AlbumSearch} />
          <Route
            path="/albums/searchResults"
            exact={true}
            component={AlbumSearch}
          />
          <Route path="/album" exact={true} component={AlbumInfo} />
          <Route path="/tracks" exact={true} component={TrackSearch} />
          <Route
            path="/tracks/searchResults"
            exact={true}
            component={TrackSearch}
          />
          <Route component={() => <div>Not Found</div>} />
        </Switch>
      </Scrollbars>
    </Body>
  </Root>
);

export default Routes;

const Root = styled('div')`
  align-items: center;
  background-color: #090e11;
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;
