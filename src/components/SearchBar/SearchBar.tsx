import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { searchAlbumsAction } from '@Store/albums/actions';
import React from 'react';
import SearchInput from '@Components/SearchInput/SearchInput';
import styled from 'styled-components';

interface PropsFromDispatch extends RouteComponentProps {
  searchAlbumsAction: typeof searchAlbumsAction;
  placeHolder?: string;
  search: (value: string) => void;
}

export type IProps = PropsFromDispatch;

class SearchBar extends React.Component<IProps> {
  private _search = (value: string): void => {
    this.props.search(value);
  };

  public render(): React.ReactElement {
    return (
      <SearchBarContainer>
        <SearchInput
          search={this._search}
          placeHolder={this.props.placeHolder}
        />
      </SearchBarContainer>
    );
  }
}

const mapDispatchToProps = {
  searchAlbumsAction,
};

export const TestComponent = SearchBar;

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));

// Styled components

const SearchBarContainer = styled('div')`
  // display: flex;
  // height: 30px;
  margin: 0px 75px;
  @media (min-width: 320px) and (max-width: 768px) {
    margin: 10px 50px;
  }
`;
