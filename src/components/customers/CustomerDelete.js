import React from "react";
import { redirect, useNavigate, useSubmit } from "react-router-dom";
import ConfirmDelete from "../modals/ConfirmDelete";

const CustomerDelete = () => {
  const navigation = useNavigate();

  const submit = useSubmit();

  const deleteHandler = () => {
    submit(null, { method: "delete" });
  };

  return (
    <>
      <ConfirmDelete
        text={"Surely delete customer?"}
        confirmAction={deleteHandler}
        cancelAction={() => navigation("/customers")}
      />
    </>
  );
};

export default CustomerDelete;

export async function action({ params, request }) {
  const allIds = params.id.split(",");

  for (const allId of allIds) {
    await fetch(
      `https://640452e13bdc59fa8f365dfc.mockapi.io/customers/${allId}`,
      {
        method: request.method,
      }
    );
  }

  return redirect("/customers");
}
