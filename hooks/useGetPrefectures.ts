import useSWR from 'swr';
import { PrefectureResponse } from '../interfaces';
import { API_URL_PREFECTURE } from '../libs/config';
import { fetcher } from '../libs/fetcher';

export const useGetPrefectures = () => {
  const { data, error } = useSWR(API_URL_PREFECTURE, fetcher);

  return {
    prefectures: data ? (data as PrefectureResponse).result : undefined,
    isLoading: !error && !data,
    hasError: error
  };
}