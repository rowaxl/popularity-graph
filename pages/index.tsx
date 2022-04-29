import type { NextPage } from 'next'
import Head from 'next/head'

import { useState, useEffect } from 'react'
import PrefectureCheckBoxes from '../components/PrefectureSelectBox'
import { useGetPrefectures } from '../hooks/useGetPrefectures'
import { Prefecture } from '../interfaces'
import { PREFECTURE_CODES } from '../libs/config'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // 都道府県取得
  const { prefectures, hasError: hasGetPrefectureError } = useGetPrefectures();
  const [prefectureMap, setPrefectureMap] = useState<Record<string, Prefecture>>();

  const handleUpdateChecked = (target: string) => {
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
  // 東京都チェック
  // チェックされているprefCodeのpopulationを取得
  // 取得したpopulationは、reduxに格納
  // チェック状態の変化時、reduxにデータがないと取得
  // ある場合はredux内のデータを使う

  return (
    <div className={styles.container}>
      <Head>
        <title>都道府県別人口推移</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>
            都道府県別人口推移
          </h1>
        </div>

        <div className={styles.grid}>
          <PrefectureCheckBoxes
            prefectures={prefectureMap}
            updateChecked={handleUpdateChecked}
          />
        </div>

        <div className={styles.grid}>
          {/* graphs */}
          Graph
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
