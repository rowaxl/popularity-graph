import styles from '../styles/Checkboxes.module.css'

interface CheckBoxProps {
  label: string
  value: string
  isChecked: boolean
  onChange: (target: string, newValue: boolean) => void
}

const CheckBox = ({ label, value, isChecked, onChange }: CheckBoxProps) => {
  const handleOnChange = () => {
    onChange(value, !isChecked);
  }

  return (
    <div className={styles.checkbox}>
      <input
        id={value}
        type='checkbox'
        value={value}
        checked={isChecked}
        onChange={handleOnChange}
      />

      <label htmlFor={value}>
        {label}
      </label>
    </div>
  )
}

export default CheckBox;
