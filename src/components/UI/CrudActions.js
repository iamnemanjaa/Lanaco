import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from "./TableAndActions.module.css";
import ToastNotificationModal from "../modals/ToastNotification";

const CrudActions = ({idList, invoices, type}) => {
  const [notificationModal, setNotificationModal] = useState([]);

  const navigate = useNavigate();

  const showToastHandler = (text, type) => {
    const data = [...notificationModal, {id: notificationModal.length+1, type: type, text: `${text}`}]
    setNotificationModal(data);
  }

  const handleDelete = () => {
    for (const id of idList) {
      if (type === 'customer') {
        if (invoices.findIndex(invoice => invoice.customerId === id) !== -1) {
          return showToastHandler(`Can't delete ${invoices[invoices.findIndex(invoice => invoice.customerId === id)].customerName} as he is in invoices!`, true);
        }
      }
      if (type === 'seller') {
        if (invoices.findIndex(invoice => invoice.sellerId === id) !== -1) {
          return showToastHandler(`Can't delete ${invoices[invoices.findIndex(invoice => invoice.sellerId === id)].sellerName} as it is in invoices!`, true);
        }
      }
    }
    navigate(`${idList.map(id => id)}/delete`);
  }

  return (
    <div className={classes.actions}>

      <ToastNotificationModal data={notificationModal} setData={setNotificationModal}></ToastNotificationModal>

      <Link to={'new'}>
        <i className='bx bx-plus'></i>
      </Link>

      {idList.length !== 1 && <div>
        <i className='bx bxs-edit-alt'></i>
      </div>}

      {idList.length ===1 && <Link to={`${idList[0]}`} className={classes.edit}>
        <i className='bx bxs-edit-alt'></i>
      </Link>}

      {idList.length === 0 && <div>
        <i className='bx bx-x'></i>
      </div>}

      {idList.length > 0 && <div onClick={handleDelete} className={classes.delete}>
        <i className='bx bx-x'></i>
      </div>}
    </div>
  );
};

export default CrudActions;