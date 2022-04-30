import type { NextPage } from 'next'
import Head from 'next/head'

import { useState, useEffect, useMemo } from 'react'
import PopulationChart from '../components/PopulationChart'
import PrefectureCheckBoxes from '../components/PrefectureSelectBox'
import useGetPopulation from '../hooks/useGetPopulation'
import { useGetPrefectures } from '../hooks/useGetPrefectures'
import { Prefecture } from '../interfaces'
import { PREFECTURE_CODES } from '../libs/config'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // 都道府県取得
  const {
    prefectures,
    hasError: hasGetPrefectureError,
    isLoading: isLoadingPrefectures,
  } = useGetPrefectures();

  const [prefectureMap, setPrefectureMap] = useState<Record<string, Prefecture>>();
  const [checked, setChecked] = useState<number[]>([]);

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
    isLoading: isLoadingPopulationData
  } = useGetPopulation(prefectureMap);

  return (
    <div className={styles.container}>
      <Head>
        <title>都道府県別人口推移</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid + ' ' + styles.gridWrap}>
          <h1 className={styles.title}>
            都道府県別人口推移
          </h1>

          <h2>
            {checkedPrefectures?.map(p => p.prefName).join(', ')}
          </h2>
        </div>

        <div className={styles.grid}>
          <PrefectureCheckBoxes
            prefectures={prefectureMap}
            updateChecked={handleUpdateChecked}
            isLoading={isLoadingPrefectures}
          />
        </div>

        <div className={styles.grid}>
          {
            selectedPopulationData &&
            <PopulationChart populations={selectedPopulationData} isLoading={isLoadingPopulationData} />
          }
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
