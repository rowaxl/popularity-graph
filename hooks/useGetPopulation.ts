import { useState, useEffect } from 'react';
import { PopulationResponse, PopulationSingleData, Prefecture } from '../interfaces';
import { API_URL_POPULATION } from '../libs/config';
import { fetcher } from '../libs/fetcher';

const cachedData: Record<string, PopulationSingleData[]> = {};

const getPopulationData = async (code: number) => {
  const response = await fetcher<PopulationResponse>(`${API_URL_POPULATION}${code}`);

  if (!response) throw new Error('Error occured during fetch population');

  const totalPopulation = response.result.data[0].data;

  return totalPopulation;
}

const useGetPopulation = (prefectureMap?: Record<string, Prefecture>) => {
  const [selectedPopulationData, setSelectedPopulationData] = useState<Record<string, PopulationSingleData[]>[]>();
  const [errors, setErrors] = useState<Error>();

  const fetchPopulationData = async (prefCodes?: number[]) => {
    if (!prefCodes) return [];

    const result = await Promise.all(prefCodes.map(async (code) => {
      const dataKey = code.toString() as keyof typeof cachedData;
      if (cachedData[dataKey])
        return { [code]: cachedData[dataKey] };

      const populationData = await getPopulationData(code);

      cachedData[dataKey] = populationData;

      return { [code]: populationData};
    }));

    if (!result) return;

    setSelectedPopulationData(result);
  }

  useEffect(() => {
    if (prefectureMap) {
      const checkedPrefectures = Object.keys(prefectureMap).filter(key => prefectureMap[key].checked).map(key => prefectureMap[key].prefCode);

      fetchPopulationData(checkedPrefectures);
    }
  }, [prefectureMap]);

  return {
    selectedPopulationData,
    isLoading: !setSelectedPopulationData && !errors,
    errors,
  }
}

export default useGetPopulation;
