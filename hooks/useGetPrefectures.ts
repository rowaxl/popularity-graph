import useSWR from 'swr';
import { PrefectureResponse } from '../interfaces';
import { API_URL_PREFECTURE } from '../libs/config';
import { fetcher } from '../libs/fetcher';

export const useGetPrefectures = () => {
  const { data, error } = useSWR<PrefectureResponse>(API_URL_PREFECTURE, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    prefectures: data?.result,
    isLoading: !error && !data,
    hasError: error
  };
}