import React, {useState} from 'react';
import classes from "../UI/AddEditForm.module.css";
import {useSubmit} from "react-router-dom";
import ToastNotificationModal from "../modals/ToastNotification";

const AddEditCustomer = ({edit, data, close}) => {
  const submit = useSubmit();

  const [formData, setFormData] = useState({
    name: data ? data['name'] : '',
    surename: data ? data['surename'] : '',
    address: data ? data['address'] : '',
    age: data ? data['age'] : '',
  });

  const [notificationModal, setNotificationModal] = useState([]);

  const showToastHandler = (text, type) => {
    const data = [...notificationModal, {id: notificationModal.length+1, type: type, text: `${text}`}]
    setNotificationModal(data);
  }

  const changeHandler = ev => {
    if (ev.target.name === 'name') {
      setFormData(prevState => {return {...prevState, name: ev.target.value}})
    }

    if (ev.target.name === 'surename') {
      setFormData(prevState => {return {...prevState, surename: ev.target.value}})
    }

    if (ev.target.name === 'address') {
      setFormData(prevState => {return {...prevState, address: ev.target.value}})
    }

    if (ev.target.name === 'age') {
      setFormData(prevState => {return {...prevState, age: ev.target.value}})
    }
  }

  const submitHandler = ev => {
    ev.preventDefault();
    if (formData.name === '') {
      return showToastHandler("Name can't be empty!", true)
    }

    if (formData.surename === '') {
      return showToastHandler("Surname can't be empty!", true)
    }

    if (formData.address === '') {
      return showToastHandler("Surname can't be empty!", true)
    }

    if (formData.age === '' || +formData.age <= 0) {
      return showToastHandler("Age can't be empty and can't be less than 1!", true)
    }
    submit(formData, {method: data? 'put' : 'post'})
  }

  return (
    <form className={classes.form}>

      <ToastNotificationModal data={notificationModal} setData={setNotificationModal}></ToastNotificationModal>

      <div>
        <label htmlFor="name">Name</label>
        <input type={'text'} id="name" name="name" defaultValue={formData.name} onChange={changeHandler} />
      </div>

      <div>
        <label htmlFor="surename">Surname</label>
        <input type={'text'} id="surename" name="surename" defaultValue={formData.surename} onChange={changeHandler} />
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input type={'text'} id="address" name="address" defaultValue={formData.address} onChange={changeHandler} />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input type={'number'} id="age" name="age" defaultValue={formData.age} onChange={changeHandler} />
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

export default AddEditCustomer;