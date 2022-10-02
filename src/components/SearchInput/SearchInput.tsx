import { IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

interface PropsFromDispatch {
  search: (value: string) => void;
  placeHolder?: string;
}

export type IProps = PropsFromDispatch;

interface IState {
  value: string;
}

class SearchInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  private _handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const cleanValue = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    this.setState({ value: cleanValue });
  };

  private _keyPressed = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this._search();
    }
  };

  private _search = (): void => {
    this.props.search(this.state.value);
    this.setState({ value: '' });
  };

  public render(): React.ReactNode {
    return (
      <SearchBar>
        <StyledInput
          className="input"
          id="searchInput"
          inputProps={{ 'aria-label': 'description' }}
          onChange={this._handleChange}
          onKeyPress={this._keyPressed}
          placeholder={this.props.placeHolder ?? 'Search for your'}
          type="text"
          value={this.state.value}
        />
        <IconButtonContainer>
          <IconButton aria-label="search" size="small" onClick={this._search}>
            <SearchIcon />
          </IconButton>
        </IconButtonContainer>
      </SearchBar>
    );
  }
}

export default SearchInput;

// Styled components

const SearchBar = styled('div')`
  background-color: white;
  border-radius: 7px;
  display: flex;
  > .MuiInputBase-root {
    width: 100%;
  }
`;

const IconButtonContainer = styled('div')`
  height: 30px;
  right: 0;
  top: 0;
`;

const StyledInput = styled(Input)`
  font-size: 14px;
  margin-left: 5px;
  padding: 0;
`;
