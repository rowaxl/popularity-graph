import Head from 'next/head'
import Overlay from '../components/Ovelay'
import PopulationChart from '../components/PopulationChart'
import PrefectureCheckBoxes from '../components/PrefectureSelectBox'
import { PopulationMap, Prefecture } from '../interfaces'
import styles from '../styles/Home.module.css'

interface IndexPageLayoutProps {
  prefectureMap: Record<string, Prefecture> | undefined
  checkedPrefectures: Prefecture[] | undefined
  populationData: PopulationMap[] | undefined
  onUpdateChecked: (target: number) => void
  isOverlayShown: boolean
}

const IndexPageLayout = ({
  prefectureMap,
  checkedPrefectures,
  populationData,
  onUpdateChecked,
  isOverlayShown,
}: IndexPageLayoutProps) => {
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
            updateChecked={onUpdateChecked}
          />
        </div>

        <div className={styles.grid}>
          {
            populationData &&
            <PopulationChart populations={populationData} />
          }
        </div>
      </main>

      <footer className={styles.footer}>
        By rowaxl0(rowaxl0@gmail.com)
      </footer>

      <Overlay isShown={isOverlayShown} />
    </div>
  )
}

export default IndexPageLayout;
