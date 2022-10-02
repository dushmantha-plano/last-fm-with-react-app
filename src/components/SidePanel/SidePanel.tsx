import { Button, Drawer } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import styled from 'styled-components';

interface PropsFromDispatch {}

export type IProps = PropsFromDispatch;

interface IState {
  open: boolean;
}

class SidePanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  private _btnClick = (): void => {
    this.setState({ open: true });
  };

  private _btnClose = (): void => {
    this.setState({ open: false });
  };

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: 'max-content', marginRight: 10 }}
          onClick={this._btnClick}
        >
          <FavoriteIcon style={{ marginRight: 5 }}></FavoriteIcon>Show My
          Favorites
        </Button>
        <StyledDrawer
          open={this.state.open}
          anchor={'right'}
          onClose={this._btnClose}
        >
          <TitleWrapper>
            <SpanText>List of My Favorite Artists</SpanText>
          </TitleWrapper>
        </StyledDrawer>
      </React.Fragment>
    );
  }
}

export default SidePanel;

// Styled components

const StyledDrawer = styled(Drawer)`
  padding: '30px 50px';
`;

const TitleWrapper = styled('div')`
  alignItems: 'center'
  display: 'flex';
  flexDirection: 'column';
  padding: '30px 50px';
  padding: '30px 50px';
`;
const SpanText = styled('span')`
  fontsize: 20;
  fontweight: 600;
`;
