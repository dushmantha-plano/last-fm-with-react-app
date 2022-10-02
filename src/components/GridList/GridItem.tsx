import 'react-responsive-carousel/lib/styles/carousel.min.css';
import deafultTrackCover from '@Assets/images/deafultTrackCover.png';
import React from 'react';
import styled from 'styled-components';
import { GridListTile, GridListTileBar } from '@material-ui/core';

interface PropsFromState {
  tracks: any[];
}

export type IProps = PropsFromState;

class AlbumTracks extends React.Component<IProps> {

  private _gridItem = (track: any, index: number): React.ReactChild => (
    <StyledGridListTitle
      key={index}
      cols={1}
    >
      <ImageContainer
        src={deafultTrackCover}
      />
      <StyledGridListTileBar
        title={track}
        actionPosition="left"
      />
    </StyledGridListTitle>
  );

  private _gridItems = (): React.ReactChild[] =>
    this.props.tracks.map(
      (track: any, index: number): React.ReactChild =>
        this._gridItem(track, index),
    );


  public render(): React.ReactNode {
    return (
      <Wrapper>
        <StyledGridList
        >
          {this._gridItems()}
        </StyledGridList>
      </Wrapper>
    );
  }
}

export default AlbumTracks;

// Styled components

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20px;
  margin-top: 45px;
`;

const StyledGridList = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  > li {
    list-style: none;
  }

  @media (min-width: 320px) and (max-width: 768px) {
     grid-template-columns: 1fr;
  }
`;

const StyledGridListTitle = styled(GridListTile)`
cursor: pointer;
`;

const StyledGridListTileBar = styled(GridListTileBar)`
  height: 80px;

  > div > .MuiGridListTileBar-title {
    font-size: 20px;
    text-align: center;
    font-weight: 500;
  }

  
  > div > .MuiGridListTileBar-subtitle {
    text-align: center;
    margin-top: 8px;
    margin-bottom: 15px;
    font-weight: 300;
  }
`;

const ImageContainer = styled('img')`
  border: 1px rgba(255, 255, 255, 0.5) solid;
  max-height: 100%;
  max-width: 100%;
  border-radius: 5px;
  transform: scale(1);
`;
