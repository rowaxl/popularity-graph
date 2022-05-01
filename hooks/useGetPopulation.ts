import { useState, useEffect } from 'react';
import { PopulationMap, PopulationResponse, PopulationSingleData, Prefecture } from '../interfaces';
import { API_URL_POPULATION, STROKE_COLORS } from '../libs/config';
import { fetcher } from '../libs/fetcher';

const cachedData: Record<string, PopulationSingleData[]> = {};

const getPopulationData = async (code: number) => {
  const response = await fetcher<PopulationResponse>(`${API_URL_POPULATION}${code}`);

  if (!response) throw new Error('Error occured during fetch population');

  const totalPopulation = response.result.data[0].data;

  return totalPopulation;
}

const useGetPopulation = (prefectureMap?: Record<string, Prefecture>) => {
  const [selectedPopulationData, setSelectedPopulationData] = useState<PopulationMap[]>();
  const [errors, setErrors] = useState<Error[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopulationData = async (prefCodes?: number[]) => {
    if (!prefCodes || !prefectureMap) return [];

    setIsLoading(true);
    setErrors([]);
    const result = await Promise.all(prefCodes.map(async (code) => {
      const dataKey = code.toString() as keyof typeof cachedData;

      if (cachedData[dataKey]) {
        return {
          prefName: prefectureMap[code].prefName || '',
          prefCode: code,
          color: STROKE_COLORS[code],
          data: cachedData[dataKey]
        };
      }

      const populationData = await getPopulationData(code);

      if (!populationData) setErrors([...errors, new Error('Failed to fetch population data')])

      cachedData[dataKey] = populationData;

      return ({
        prefName: prefectureMap[code].prefName || '',
        prefCode: code,
        color: STROKE_COLORS[code],
        data: populationData
      });
    }));

    setIsLoading(false);
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
    isLoading,
    errors,
  }
}

export default useGetPopulation;
