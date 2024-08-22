import React from 'react';
import styles from "./ButtonUi.module.css";
const ButtonUi = props => {
  return (
    <button
      className={styles.btn}
      style={{ marginRight:'10px' }}
      type={props.types || 'button'}
      onClick={props.onBtnClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonUi;
