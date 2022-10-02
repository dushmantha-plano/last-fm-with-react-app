import { AlbumInfo as AlbumData } from '@Store/albums/types';
import { ApplicationState } from '@Store/index';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import SimpleMessage from '@Components/SimpleMessage/SimpleMessage';
import styled from 'styled-components';
import AlbumDetail from './components/AlbumDetail';
import Header from './components/Header';
import GridItem from '@Components/GridList/GridItem';

interface PropsFromState {
  albumInfo: AlbumData | null;
  isInfoSearchLoading: boolean;
}

type PropsWithRoute = PropsFromState & RouteComponentProps;

interface PropsFromDispatch {}

type IProps = PropsWithRoute & PropsFromDispatch;

interface IState {
  artistName: string;
  albumName: string;
}

class AlbumInfo extends React.Component<IProps, IState> {
  public render(): React.ReactElement {
    const album = this.props.albumInfo;
    const isLoadingAlbums = this.props.isInfoSearchLoading;
    return (
      <Wrapper>
        {isLoadingAlbums && (
          <StyledCircularProgress>
            <CircularProgress color="secondary" />
          </StyledCircularProgress>
        )}
        {!isLoadingAlbums &&
          (album ? (
            <ArtistContainer>
              <HeaderContainer>
                <Header
                  name={album.name}
                  image={album.image.large}
                  artist={album.artist}
                  playCount={Number(album.playcount)}
                />
              </HeaderContainer>
              <InfoContainer>
                <BioContainer>
                  <AlbumDetail fullBio={album.wiki.summary} />
                </BioContainer>
                <GridItem tracks={album.tracks} />
              </InfoContainer>
            </ArtistContainer>
          ) : (
            <SimpleMessageStyled text={'The album was not found'} />
          ))}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ albums }: ApplicationState): PropsFromState => ({
  albumInfo: albums.infoCache,
  isInfoSearchLoading: albums.isInfoSearchLoading,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumInfo);

const SimpleMessageStyled = styled(SimpleMessage)`
  margin-top: 10px;
`;

const Wrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 50px;
  }
`;

const InfoContainer = styled('div')`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 2fr;

  @media (min-width: 320px) and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-right: 15px;
  }
`;

const BioContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 50px;
  }
`;

const ArtistContainer = styled('div')`
  height: 100%;
  width: 100%;
`;

const HeaderContainer = styled('div')`
  height: 200px;
  position: relative;
`;

const StyledCircularProgress = styled('div')`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  > div {
    height: 100px !important;
    width: 100px !important;
  }
`;
