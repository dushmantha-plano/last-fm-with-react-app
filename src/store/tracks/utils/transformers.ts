import { Track } from '../types';
import { get } from 'lodash';

// Still need to typo the incomming artists search response
export const transformTrackResponse = (response: unknown): Track[] => {
  const rawATrackList = get(response, 'results.trackmatches.track', []);
  const unsortedAlbums = rawATrackList.map((track: Track) => ({
    artist: track.artist,
    image: {
      small: track.image[0]['#text'],
      // eslint-disable-next-line sort-keys
      medium: track.image[1]['#text'],
      // eslint-disable-next-line sort-keys
      large: track.image[2]['#text'],
    },
    listeners: track.listeners,
    name: track.name,
    url: track.url,
  }));

  return unsortedAlbums;
};
