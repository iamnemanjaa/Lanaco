import classes from "../UI/AddEditForm.module.css";
import { useState } from "react";
import ToastNotificationModal from "../modals/ToastNotification";
import { useSubmit } from "react-router-dom";
import { format } from "date-fns";

function AddEditInvoice({ edit, data, close, sellers, customers }) {
  const activeSellers = sellers.filter(
    (seller) => seller["isActive"] === "Active"
  );

  const submit = useSubmit();

  const [formData, setFormData] = useState({
    sellerId: data ? data["sellerId"] : "",
    sellerName: data ? data["sellerName"] : "",
    customerId: data ? data["customerId"] : "",
    customerName: data ? data["customerName"] : "",
    date: data ? data["date"] : "",
    amount: data ? data["amount"] : "",
  });

  const [notificationModal, setNotificationModal] = useState([]);

  const showToastHandler = (text, type) => {
    const data = [
      ...notificationModal,
      { id: notificationModal.length + 1, type: type, text: `${text}` },
    ];
    setNotificationModal(data);
  };

  const changeHandler = (ev) => {
    if (ev.target.name === "sellerId") {
      setFormData((prevState) => {
        return {
          ...prevState,
          sellerId: ev.target.value,
          sellerName:
            sellers[
              sellers.findIndex((seller) => seller.id === ev.target.value)
            ].companyName,
        };
      });
    }

    if (ev.target.name === "customerId") {
      setFormData((prevState) => {
        return {
          ...prevState,
          customerId: ev.target.value,
          customerName: `${
            customers[
              customers.findIndex((customer) => customer.id === ev.target.value)
            ].name
          } ${
            customers[
              customers.findIndex((customer) => customer.id === ev.target.value)
            ].surename
          }`,
        };
      });
    }

    if (ev.target.name === "date") {
      setFormData((prevState) => {
        return { ...prevState, date: ev.target.value };
      });
    }

    if (ev.target.name === "amount") {
      setFormData((prevState) => {
        return { ...prevState, amount: ev.target.value };
      });
    }
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
    if (formData.sellerName === "") {
      return showToastHandler("Seller can't be empty!", true);
    }

    if (formData.customerName === "") {
      return showToastHandler("Customer can't be empty!", true);
    }

    if (formData.date === "" || new Date(formData.date) > new Date()) {
      return showToastHandler(
        "Date can't be empty and can't be in the future!",
        true
      );
    }

    if (formData.amount === "" || +formData.amount <= 0) {
      return showToastHandler(
        "Amount can't be empty and must be larger than 1!",
        true
      );
    }
    submit(formData, { method: data ? "put" : "post" });
  };

  return (
    <form className={classes.form}>
      <ToastNotificationModal
        data={notificationModal}
        setData={setNotificationModal}
      ></ToastNotificationModal>

      <div>
        <label htmlFor="sellerId">Seller</label>
        <select
          id="sellerId"
          name="sellerId"
          defaultValue={formData.sellerId}
          onChange={changeHandler}
        >
          {activeSellers.map((seller) => (
            <option value={seller["id"]} key={seller["id"]}>
              {seller["companyName"]}
            </option>
          ))}
        </select>
      </div>

      <input
        type={"hidden"}
        id="sellerName"
        name="sellerName"
        defaultValue={formData.sellerName}
      />

      <div>
        <label htmlFor="customerId">Customer</label>
        <select
          id="customerId"
          name="customerId"
          defaultValue={formData.customerId}
          onChange={changeHandler}
        >
          {customers.map((customer) => (
            <option value={customer["id"]} key={customer["id"]}>
              {customer["name"]} {customer.surename}
            </option>
          ))}
        </select>
      </div>

      <input
        type={"hidden"}
        id="customerName"
        name="customerName"
        defaultValue={formData.customerName}
      />

      <div>
        <label htmlFor="date">Date</label>
        <input
          type={"date"}
          id="date"
          max={format(new Date(), "yyyy-MM-dd")}
          name="date"
          defaultValue={formData.date}
          onChange={changeHandler}
        />
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type={"number"}
          id="amount"
          min={1}
          name="amount"
          defaultValue={formData.amount}
          onChange={changeHandler}
        />
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={close}>
          Discard
        </button>
        <button onClick={submitHandler}>{edit ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}

export default AddEditInvoice;
