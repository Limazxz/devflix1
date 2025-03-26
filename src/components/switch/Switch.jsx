import styles from './Switch.module.css';

const Switch = ({ onChange, checked, checkedIcon, uncheckedIcon, offColor, onColor }) => {
  return (
    <div
      className={styles.switchContainer}
      onClick={onChange}
      style={{
        backgroundColor: checked ? onColor : offColor,
      }}
    >
      <div className={styles.switchButton}>
        {checked ? checkedIcon : uncheckedIcon}
      </div>
    </div>
  );
};

export default Switch;