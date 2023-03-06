import React from "react";
import { redirect, useNavigate, useSubmit } from "react-router-dom";
import ConfirmDelete from "../modals/ConfirmDelete";

const InvoiceDelete = () => {
  const navigation = useNavigate();

  const submit = useSubmit();

  const deleteHandler = () => {
    submit(null, { method: "delete" });
  };

  return (
    <>
      <ConfirmDelete
        text={"Surely delete invoice?"}
        confirmAction={deleteHandler}
        cancelAction={() => navigation("/invoices")}
      />
    </>
  );
};

export default InvoiceDelete;

export async function action({ params, request }) {
  const allIds = params.id.split(",");

  for (const allId of allIds) {
    await fetch(
      `https://640457763bdc59fa8f36bc0e.mockapi.io/invoices/${allId}`,
      {
        method: request.method,
      }
    );
  }

  return redirect("/invoices");
}
