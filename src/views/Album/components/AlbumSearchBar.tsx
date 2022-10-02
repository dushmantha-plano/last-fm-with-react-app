import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import { searchAlbumsAction } from '@Store/albums/actions';
import styled from 'styled-components';
import SearchBar from '@Components/SearchBar/SearchBar';

interface PropsFromDispatch extends RouteComponentProps {
  searchAlbumsAction: typeof searchAlbumsAction;
}

export type IProps = PropsFromDispatch;

class AlbumSearchBar extends React.Component<IProps> {
  private _search = (value: string): void => {
    this.props.history.push('/albums/searchResults');
    this.props.searchAlbumsAction(value);
  };

  public render(): React.ReactElement {
    return (
      <SearchBarContainer>
        <SearchBar search={this._search} placeHolder={'Search your album..'} />
      </SearchBarContainer>
    );
  }
}

const mapDispatchToProps = {
  searchAlbumsAction,
};

export const TestComponent = AlbumSearchBar;

export default withRouter(connect(null, mapDispatchToProps)(AlbumSearchBar));

// Styled components

const SearchBarContainer = styled('div')`
  margin: 0px 75px;
  @media (min-width: 320px) and (max-width: 768px) {
    margin: 0px 25px;
  }
`;
