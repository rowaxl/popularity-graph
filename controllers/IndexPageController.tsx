import { useState, useEffect, useMemo } from 'react'
import useGetPopulation from '../hooks/useGetPopulation'
import { useGetPrefectures } from '../hooks/useGetPrefectures'
import { Prefecture } from '../interfaces'
import IndexPageLayout from '../layouts/IndexPageLayouts'
import { PREFECTURE_CODES } from '../libs/config'

const IndexPageController = () => {
  const {
    prefectures,
    hasError: hasGetPrefectureError,
    isLoading: isLoadingPrefectures,
  } = useGetPrefectures();

  const [prefectureMap, setPrefectureMap] = useState<Record<string, Prefecture>>();

  const handleUpdateChecked = (target: number) => {
    const targetRow = prefectureMap ? prefectureMap[target] : undefined;
    if (!targetRow) return

    setPrefectureMap({
      ...prefectureMap,
      [target]: {
        ...targetRow,
        checked: !targetRow.checked
      }
    })
  }

  useEffect(() => {
    if (prefectures) {
      const map = {};

      prefectures.forEach(v => {
        Object.assign(map, {[v.prefCode]: {
          prefCode: v.prefCode,
          prefName: v.prefName,
          checked: v.prefCode === PREFECTURE_CODES.TOKYO,
        }})
      })

      setPrefectureMap(map)
    }
  }, [prefectures]);

  const checkedPrefectures = useMemo(() => {
    if (!prefectureMap) return;

    return Object.keys(prefectureMap).filter(key => prefectureMap[key].checked).map(key => prefectureMap[key]);
  }, [prefectureMap]);

  const {
    selectedPopulationData,
    errors: getPopulationDataErrors,
    isLoading: isLoadingPopulationData
  } = useGetPopulation(prefectureMap);

  useEffect(() => {
    if (hasGetPrefectureError) {
      console.error(hasGetPrefectureError);
    }
  }, [hasGetPrefectureError])

  useEffect(() => {
    if (getPopulationDataErrors.length > 0) {
      getPopulationDataErrors.forEach(e => console.error(e));
    }
  }, [getPopulationDataErrors])

  return (
    <>
      <IndexPageLayout
        prefectureMap={prefectureMap}
        checkedPrefectures={checkedPrefectures}
        populationData={selectedPopulationData}
        onUpdateChecked={handleUpdateChecked}
        isOverlayShown={isLoadingPrefectures || isLoadingPopulationData}
      />
    </>
  )
}

export default IndexPageController;
