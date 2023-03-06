import React from "react";
import {
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import InputModal from "../modals/InputModal";
import AddEditCustomer from "./AddEditCustomer";

const CustomerDetail = () => {
  const params = useParams();

  const data = useLoaderData();

  const navigate = useNavigate();

  return (
    <InputModal
      closeModal={() => navigate("/customers")}
      heading={params.id ? "Edit a customer" : "Add a customer"}
    >
      <AddEditCustomer
        edit={!!params.id}
        data={data}
        close={() => navigate("/customers")}
      />
    </InputModal>
  );
};

export default CustomerDetail;

export async function action({ request, params }) {
  const data = await request.formData();

  const customerData = {
    name: data.get("name"),
    surename: data.get("surename"),
    address: data.get("address"),
    age: data.get("age"),
  };

  const response = await fetch(
    `https://640452e13bdc59fa8f365dfc.mockapi.io/customers${
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

  return redirect("/customers");
}

export async function loader({ params }) {
  const response = await fetch(
    `https://640452e13bdc59fa8f365dfc.mockapi.io/customers/${params.id}`
  );

  if (!response.ok) {
    return json({ message: "Could not fetch data!" }, { status: 500 });
  } else {
    return response;
  }
}
