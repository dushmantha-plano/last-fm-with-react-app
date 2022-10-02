import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Album } from '@Store/albums/types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import { IBrowser } from 'redux-responsive/types';
import { RouteComponentProps, withRouter } from 'react-router';
import { searchAlbumInfoAction } from '@Store/albums/actions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { MouseEvent } from 'react';
import defaultArtistCover from '@Assets/images/defaultArtistCover.png';
import styled from 'styled-components';

interface PropsFromState extends RouteComponentProps {
  albums: Album[];
  browser: IBrowser;
}

interface PropsFromDispatch {
  searchAlbumInfoAction: typeof searchAlbumInfoAction;
}

export type IProps = PropsFromState & PropsFromDispatch;

const gridWidthColumns: Record<string, number> = {
  extraSmall: 2,
  small: 2,
  // eslint-disable-next-line sort-keys
  medium: 4,
  // eslint-disable-next-line sort-keys
  large: 4,
  // eslint-disable-next-line sort-keys
  infinity: 4,
};

class GridAlbumList extends React.Component<IProps> {
  private _clickArtist = (event: MouseEvent, album: Album): void => {
    event.preventDefault();
    this.props.searchAlbumInfoAction(album.artist, album.name);
    this.props.history.push({
      pathname: '/album',
    });
  };

  private _getImage = (image: string): string =>
    image !== '' ? image : defaultArtistCover;

  private _gridItem = (album: Album, index: number): React.ReactElement => (
    <StyledGridListTitle
      key={index}
      cols={1}
      onClick={(e: MouseEvent): void => this._clickArtist(e, album)}
    >
      <IconButton
        aria-label="search"
        size="small"
        style={{ position: 'absolute', right: 0 }}
      >
        <FavoriteIcon />
      </IconButton>
      <ImageContainer
        src={this._getImage(album.image.large)}
        alt={album.name}
      />
      <StyledGridListTileBar
        title={album.name}
        subtitle={<span>Artist: {album.artist}</span>}
        actionPosition="left"
      />
    </StyledGridListTitle>
  );

  private _gridItems = (): React.ReactNode =>
    this.props.albums.map(
      (album: Album, index: number): React.ReactElement =>
        this._gridItem(album, index),
    );

  private _getGridColumns = (type: string): number => gridWidthColumns[type];

  public render(): React.ReactElement {
    return (
      <Wrapper>
        <StyledGridList
          spacing={20}
          cols={this._getGridColumns(this.props.browser.mediaType)}
        >
          {this._gridItems()}
        </StyledGridList>
      </Wrapper>
    );
  }
}

export default withRouter(GridAlbumList);

// Styled components

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 45px;
  padding: 0 20px;
`;

const StyledGridList = styled(GridList)``;

const StyledGridListTitle = styled(GridListTile)`
  cursor: pointer;
`;

const StyledGridListTileBar = styled(GridListTileBar)`
  height: 80px;

  > div > .MuiGridListTileBar-title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }

  > div > .MuiGridListTileBar-subtitle {
    font-weight: 300;
    margin-bottom: 15px;
    margin-top: 8px;
    text-align: center;
  }
`;

const ImageContainer = styled('img')`
  border: 1px rgba(255, 255, 255, 0.5) solid;
  border-radius: 5px;
  border-radius: 5px;
  max-height: 100%;
  max-width: 100%;
  transform: scale(2);
`;
