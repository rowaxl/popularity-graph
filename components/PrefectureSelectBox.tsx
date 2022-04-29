import { Prefecture } from "../interfaces";
import CheckBox from "./CheckBox";
import styles from '../styles/Checkboxes.module.css'

interface PrefectureCheckBoxesProps {
  prefectures?: {
    [prefCode: string]: Prefecture
  }
  updateChecked: (target: string) => void
}

const PrefectureCheckBoxes = ({ prefectures, updateChecked }: PrefectureCheckBoxesProps) => {
  const handleChangeChecked = (target: string) => {
    updateChecked(target);
  }

  if (!prefectures) return <>Loading...</>;

  return (
    <div className={styles.container}>
      {Object.keys(prefectures).map(code => (
        <CheckBox
          key={prefectures[code].prefCode}
          label={prefectures[code].prefName}
          value={prefectures[code].prefCode.toString()}
          isChecked={!!prefectures[code].checked}
          onChange={handleChangeChecked}
        />
      ))}
    </div>
  )
}

export default PrefectureCheckBoxes;
