/* eslint-disable @typescript-eslint/naming-convention */
import { Track } from '../types';
import { config } from '@Config/config';
import { transformTrackResponse } from './transformers';
import axios from 'axios';

interface Params {
  api_key: string;
  track?: string;
  format: string;
  limit?: number;
  method: string;
}

export async function searchTracks(track: string): Promise<Track[]> {
  const rawData = await callLastFMAPI(
    'track.search',
    [{ name: 'track', value: track }],
    1000,
  );
  return transformTrackResponse(rawData);
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
