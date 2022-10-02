import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import styled from 'styled-components';

interface PropsFromState {
  items: any[];
  value: string;
  onChange: (value: string) => void;
}

export type IProps = PropsFromState;

class SelectMenu extends React.Component<IProps> {
  private _gridItem = (item: any, index: number): React.ReactChild => (
    <MenuItem key={index} value={item.value}>
      {item.name}
    </MenuItem>
  );

  private _onChangeHandle = (
    event: React.ChangeEvent<HTMLInputElement>,
    child: boolean,
  ): void => {
    const cleanValue = event.target.value;
    this.props.onChange(cleanValue);
  };

  private _gridItems = (): React.ReactChild[] =>
    this.props.items.map(
      (track: any, index: number): React.ReactChild =>
        this._gridItem(track, index),
    );

  public render(): React.ReactNode {
    return (
      <Wrapper>
        <Select
          label="Sort"
          value={this.props.value}
          defaultValue=""
          onChange={this._onChangeHandle}
        >
          {this._gridItems()}
        </Select>
      </Wrapper>
    );
  }
}

export default SelectMenu;

// Styled components

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 45px;
  padding: 0 20px;
`;
