import React from "react";
import {
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import InputModal from "../modals/InputModal";
import AddEditInvoice from "./AddEditInvoice";

const InvoiceDetail = () => {
  const params = useParams();

  const data = useLoaderData();
  let detail;
  if (params.id) {
    detail = data.detail;
  }

  const navigate = useNavigate();

  return (
    <InputModal
      closeModal={() => navigate("/invoices")}
      heading={params.id ? "Edit an invoice" : "Create an invoice"}
    >
      <AddEditInvoice
        edit={!!params.id}
        data={detail}
        customers={data.customers}
        sellers={data.sellers}
        close={() => navigate("/invoices")}
      />
    </InputModal>
  );
};

export default InvoiceDetail;

export async function action({ request, params }) {
  const data = await request.formData();

  const customerData = {
    sellerId: data.get("sellerId"),
    sellerName: data.get("sellerName"),
    customerId: data.get("customerId"),
    customerName: data.get("customerName"),
    date: data.get("date"),
    amount: data.get("amount"),
  };

  const response = await fetch(
    `https://640457763bdc59fa8f36bc0e.mockapi.io/invoices${
      request.method === "PUT" ? "/" + params.id : ""
    }`,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    }
  );

  if (!response.ok) {
    throw json({ message: "Data could not be posted!" }, { status: 500 });
  }

  return redirect("/invoices");
}

export async function loader({ params }) {
  let response;
  if (params.id)
    response = await fetch(
      `https://640457763bdc59fa8f36bc0e.mockapi.io/invoices/${params.id}`
    );
  const customerResponse = await fetch(
    "https://640452e13bdc59fa8f365dfc.mockapi.io/customers"
  );
  const sellerResponse = await fetch(
    "https://640452e13bdc59fa8f365dfc.mockapi.io/sellers"
  );

  if (params.id) {
    if (!response.ok || !customerResponse.ok || !sellerResponse.ok) {
      return json({ message: "Could not fetch data!" }, { status: 500 });
    } else {
      return {
        detail: await response.json(),
        customers: await customerResponse.json(),
        sellers: await sellerResponse.json(),
      };
    }
  } else {
    if (!customerResponse.ok || !sellerResponse.ok) {
      return json({ message: "Could not fetch data!" }, { status: 500 });
    } else {
      return {
        customers: await customerResponse.json(),
        sellers: await sellerResponse.json(),
      };
    }
  }
}
