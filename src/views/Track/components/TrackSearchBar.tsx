import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import { searchTracksAction } from '@Store/tracks/actions';
import styled from 'styled-components';
import SearchBar from '@Components/SearchBar/SearchBar';

interface PropsFromDispatch extends RouteComponentProps {
  searchTracksAction: typeof searchTracksAction;
}

export type IProps = PropsFromDispatch;

class TrackSearchBar extends React.Component<IProps> {
  private _search = (value: string): void => {
    this.props.history.push('/tracks/searchResults');
    this.props.searchTracksAction(value);
  };

  public render(): React.ReactElement {
    return (
      <SearchBarContainer>
        <SearchBar search={this._search} placeHolder={'Search your tracks..'} />
      </SearchBarContainer>
    );
  }
}

const mapDispatchToProps = {
  searchTracksAction,
};

export default withRouter(connect(null, mapDispatchToProps)(TrackSearchBar));

// Styled components

const SearchBarContainer = styled('div')`
  margin: 0px 75px;
  @media (min-width: 320px) and (max-width: 768px) {
    margin: 0px 25px;
  }
`;
