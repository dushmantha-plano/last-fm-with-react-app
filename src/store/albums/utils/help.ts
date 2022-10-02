import { Album } from '../types';

export const sortAlbums = (albums: Album[], sortBy: string): Album[] =>
  albums.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
