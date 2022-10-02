import * as React from 'react';
import styled from 'styled-components';

export interface HeaderProps {
  image: string;
  artist: string;
  name: string;
  playCount: number;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  name,
  image,
  artist,
  playCount,
}: HeaderProps): React.ReactElement => (
  <React.Fragment>
    <BackgroundContainer>
      <ImageWrapper>
        <AlbumImage
          style={{
            backgroundImage: 'url(' + image + ')',
          }}
        />
      </ImageWrapper>
      <ImageOverlay />
    </BackgroundContainer>
    <DataContainer>
      <AlbumName>{name}</AlbumName>
      <AlbumData>
        <HeaderContainer>
          <HeaderTitle>Artist</HeaderTitle>
          <AlbumArtistValue>{artist}</AlbumArtistValue>
        </HeaderContainer>
        <AlbumPlayCountContainer>
          <AlbumPlayCountTitle>Times played</AlbumPlayCountTitle>
          <AlbumPlayCountValue>
            {playCount.toLocaleString()}
          </AlbumPlayCountValue>
        </AlbumPlayCountContainer>
      </AlbumData>
    </DataContainer>
  </React.Fragment>
);

export default Header;

// Styled components

const BackgroundContainer = styled('div')`
  background-color: #161b1e;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const ImageWrapper = styled('div')`
  height: 100%;
  position: absolute;
  right: 0%;
  width: 50%;
`;

const AlbumImage = styled('img')`
  background-position: 50% 25%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

const ImageOverlay = styled('div')`
  background: linear-gradient(0.25turn, rgb(22, 27, 30, 1), rgb(22, 27, 30, 0));
  height: 100%;
  position: absolute;
  right: 0;
  width: 50%;
`;

const DataContainer = styled('div')`
  padding: 30px 20px 20px 30px;
  position: relative;
  z-index: 1;
`;

const AlbumName = styled('p')`
  font-size: 40px;

  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 30px;
  }
`;

const AlbumData = styled('div')``;

const HeaderContainer = styled('div')`
  align-items: baseline;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  width: 80px;
`;
const HeaderTitle = styled('p')`
  font-size: 10px;
`;
const AlbumArtistValue = styled('p')`
  color: white;
  font-size: 20px;
  width: max-content;
`;

const AlbumPlayCountContainer = styled('div')`
  align-items: baseline;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  width: 80px;
`;
const AlbumPlayCountTitle = styled('p')`
  font-size: 10px;
`;
const AlbumPlayCountValue = styled('p')`
  color: white;
  font-size: 20px;
`;
