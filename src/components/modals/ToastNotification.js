import React, {useEffect, useCallback} from 'react';
import ReactDOM from "react-dom";
import classes from "./ToastNotification.module.css";

const ToastNotification = props => {
  return (
    <div className={`${classes.toast_container}`}>{props.children}</div>
  )
}

const ToastNotificationModal = ({data, setData}) => {

  const deleteToast = useCallback(id => {
    const toastListItem = data.filter(e => e.id !== id);
    setData(toastListItem);
  }, [data, setData]);

  useEffect(()=> {
    const timer = setInterval(()=> {
      if(data.length) {
        deleteToast(data[0].id);
      }
    }, 3000);
    return () => {
      clearInterval(timer);
    }
  },[data, deleteToast])

  return (
    <>
      {ReactDOM.createPortal(<ToastNotification>
        {data.map((item, i) => {
          return <div key={i} className={`${classes.toast}
          ${!item.type ? classes.toast__success : classes.toast__failure}`}>
            <div className={classes.text}>{item.text}</div>
            <div className={classes.close_div}>
              <i onClick={()=> deleteToast(item.id)} className='bx bx-x'></i>
            </div>
          </div>
        })}
      </ToastNotification>, document.getElementById('overlays'))}
    </>
  )
};

export default ToastNotificationModal;