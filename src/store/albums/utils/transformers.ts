import { Album, AlbumInfo } from '../types';
import { get } from 'lodash';

// Still need to typo the incomming artists search response
export const transformAlbumResponse = (response: unknown): Album[] => {
  const rawAlbumList = get(response, 'results.albummatches.album', []);
  const unsortedAlbums = rawAlbumList.map((album: Album) => ({
    artist: album.artist,
    image: {
      small: album.image[0]['#text'],
      // eslint-disable-next-line sort-keys
      medium: album.image[1]['#text'],
      // eslint-disable-next-line sort-keys
      large: album.image[2]['#text'],
    },
    name: album.name,
    url: album.url,
  }));

  return unsortedAlbums;
};

// Still need to typo the incomming artist info response
export const transformAlbumInfoResponse = (response: unknown): AlbumInfo => {
  const albumInfoRaw = get(response, 'album', null);
  const albumInfo: AlbumInfo = {
    artist: albumInfoRaw.artist,
    id: albumInfoRaw.id,
    image: {
      small: albumInfoRaw.image[0]['#text'],
      // eslint-disable-next-line sort-keys
      medium: albumInfoRaw.image[1]['#text'],
      // eslint-disable-next-line sort-keys
      large: albumInfoRaw.image[2]['#text'],
    },
    name: albumInfoRaw.name,
    playcount: albumInfoRaw.playcount,
    releaseDate: albumInfoRaw.releaseDate,
    tracks: albumInfoRaw.tracks.track.map((track: AlbumInfo) => track.name),
    url: albumInfoRaw.url,
    wiki: {
      content: albumInfoRaw.wiki.content,
      published: albumInfoRaw.wiki.published,
      summary: albumInfoRaw.wiki.summary,
    },
  };

  return albumInfo;
};
