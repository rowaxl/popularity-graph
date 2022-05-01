import styles from '../styles/Overlay.module.css'

interface OverlayProps {
  isShown: boolean
}

const Overlay = ({ isShown }: OverlayProps) => {
  if (!isShown) return <></>;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Overlay;
