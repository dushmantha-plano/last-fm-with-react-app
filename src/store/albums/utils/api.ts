/* eslint-disable @typescript-eslint/naming-convention */
import { Album, AlbumInfo } from '../types';
import { config } from '@Config/config';
import {
  transformAlbumInfoResponse,
  transformAlbumResponse,
} from './transformers';
import axios from 'axios';

interface Params {
  api_key: string;
  artist?: string;
  album?: string;
  format: string;
  limit?: number;
  mbid?: string;
  method: string;
}

export async function searchAlbums(album: string): Promise<Album[]> {
  const rawData = await callLastFMAPI(
    'album.search',
    [{ name: 'album', value: album }],
    1000,
  );
  return transformAlbumResponse(rawData);
}

export async function searchAlbumInfo(
  artist: string,
  album: string,
): Promise<AlbumInfo> {
  const rawData = await callLastFMAPI(
    'album.getInfo',
    [
      { name: 'artist', value: artist },
      { name: 'album', value: album },
    ],
    1000,
  );
  return transformAlbumInfoResponse(rawData);
}

async function callLastFMAPI(
  method: string,
  param: { name: string; value: string }[],
  limit: number,
) {
  const APIKEY = config.API_KEY;
  const params: Params = {
    method,
    // eslint-disable-next-line sort-keys
    api_key: APIKEY,
    format: 'json',
  };
  param.forEach((p) => {
    params[p.name] = p.value;
  });

  if (limit) {
    params.limit = limit;
  }
  const rawData = await axios.get(config.API_END_POINT, {
    headers: {
      'content-type': 'application/json',
    },
    params,
  });
  const { data } = rawData;
  return data;
}
