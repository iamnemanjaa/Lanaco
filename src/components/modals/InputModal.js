import classes from "./InputModal.module.css";
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";

export const BackDrop = ({closeModal}) => {
  return (
    <div onClick={closeModal} className="backdrop"></div>
  )
}

const Modal = ({closeModal, heading, children}) => {
  const [modalClasses, setModalClasses] = useState(`${classes.modal} ${classes.hidden}`);

  useEffect(()=> {
    setModalClasses(`${classes.modal}`);
  },[])

  return (
    <div className={modalClasses}>
      <div className={classes['modal__header']}>
        <h2>{heading}</h2>
        <div onClick={closeModal} className={classes['modal__close']}>
          <i className='bx bx-x'></i>
        </div>
      </div>
      {children}
    </div>
  )
}

const InputModal = ({closeModal, heading, children}) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop closeModal={closeModal}></BackDrop>, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<Modal heading={heading} closeModal={closeModal}>{children}</Modal>, document.getElementById('overlays'))}
    </>
  )
}

export default InputModal;