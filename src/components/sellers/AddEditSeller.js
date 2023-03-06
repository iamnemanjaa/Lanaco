import React, {useState} from 'react';
import classes from "../UI/AddEditForm.module.css";
import {useSubmit} from "react-router-dom";
import ToastNotificationModal from "../modals/ToastNotification";

const AddEditSeller = ({edit, data, close}) => {
  const submit = useSubmit();

  const [formData, setFormData] = useState({
    companyName: data ? data['companyName'] : '',
    hqAddress: data ? data['hqAddress'] : '',
    isActive: data ? data['isActive'] : '',
  });

  const [notificationModal, setNotificationModal] = useState([]);

  const showToastHandler = (text, type) => {
    const data = [...notificationModal, {id: notificationModal.length+1, type: type, text: `${text}`}]
    setNotificationModal(data);
  }

  const changeHandler = ev => {
    if (ev.target.name === 'companyName') {
      setFormData(prevState => {return {...prevState, companyName: ev.target.value}})
    }

    if (ev.target.name === 'hqAddress') {
      setFormData(prevState => {return {...prevState, hqAddress: ev.target.value}})
    }

    if (ev.target.name === 'isActive') {
      setFormData(prevState => {return {...prevState, isActive: ev.target.value}})
    }
  }

  const submitHandler = ev => {
    ev.preventDefault();
    if (formData.companyName === '') {
      return showToastHandler("Name can't be empty!", true)
    }

    if (formData.hqAddress === '') {
      return showToastHandler("Address can't be empty!", true)
    }

    if (formData.isActive === '') {
      return showToastHandler("Choose active status!", true)
    }
    submit(formData, {method: data? 'put' : 'post'})
  }

  return (
    <form className={classes.form}>

      <ToastNotificationModal data={notificationModal} setData={setNotificationModal}></ToastNotificationModal>

      <div>
        <label htmlFor="companyName">Name</label>
        <input type={'text'} id="companyName" name="companyName" defaultValue={formData.companyName} onChange={changeHandler} />
      </div>

      <div>
        <label htmlFor="hqAddress">Address</label>
        <input type={'text'} id="hqAddress" name="hqAddress" defaultValue={formData.hqAddress} onChange={changeHandler} />
      </div>

      <div>
        <label htmlFor="isActive">Active</label>
        <select id="isActive" name="isActive" defaultValue={formData.isActive} onChange={changeHandler}>
          <option value={'Active'}>Yes</option>
          <option value={'No active'}>No</option>
        </select>
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={close}>
          Discard
        </button>
        <button onClick={submitHandler}>{edit ? 'Save' : 'Create'}</button>
      </div>
    </form>
  );
}

export default AddEditSeller;