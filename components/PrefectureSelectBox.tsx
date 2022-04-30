import { Prefecture } from "../interfaces";
import styles from '../styles/Checkboxes.module.css'

interface PrefectureCheckBoxesProps {
  prefectures?: {
    [prefCode: string]: Prefecture
  }
  isLoading: boolean,
  updateChecked: (target: number) => void
}

const PrefectureCheckBoxes = ({ prefectures, isLoading,  updateChecked }: PrefectureCheckBoxesProps) => {
  const handleChangeChecked = (target: number) => {
    updateChecked(target);
  }

  if (isLoading || !prefectures) return <>Loading...</>;

  return (
    <div className={styles.container}>
      {Object.keys(prefectures).map(code => (
        <div className={styles.checkbox} key={prefectures[code].prefCode}>
          <input
            id={`checkbox_${code}`}
            type='checkbox'
            value={code}
            checked={!!prefectures[code].checked}
            onChange={() => handleChangeChecked(parseInt(code))}
          />
    
          <label htmlFor={`checkbox_${code}`}>
            {prefectures[code].prefName}
          </label>
        </div>
      ))}
    </div>
  )
}

export default PrefectureCheckBoxes;
