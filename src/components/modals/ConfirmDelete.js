import classes from "./InputModal.module.css";
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";
import {BackDrop} from "./InputModal";
import styles from '../UI/AddEditForm.module.css';

const Modal = ({confirmAction, text, cancelAction, }) => {
  const [modalClasses, setModalClasses] = useState(`${classes.modal} ${classes.hidden}`);

  useEffect(()=> {
    setModalClasses(`${classes.modal}`);
  },[])

  return (
    <div className={modalClasses}>
      <div className={classes['modal__header']}>
        <h2>{text}</h2>
        <div onClick={cancelAction} className={classes['modal__close']}>
          <i className='bx bx-x'></i>
        </div>
      </div>

      <div className={styles.actions}>
        <button type={'button'} onClick={cancelAction}>
          No
        </button>
        <button onClick={confirmAction}>Yes</button>
      </div>
    </div>
  )
}

const ConfirmModal = ({cancelAction, confirmAction, text}) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop closeModal={cancelAction}></BackDrop>, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<Modal text={text} confirmAction={confirmAction} cancelAction={cancelAction}></Modal>, document.getElementById('overlays'))}
    </>
  )
}

export default ConfirmModal;