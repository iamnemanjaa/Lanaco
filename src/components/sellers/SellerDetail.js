import React from "react";
import {
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import InputModal from "../modals/InputModal";
import AddEditSeller from "./AddEditSeller";

const SellerDetail = () => {
  const params = useParams();

  const data = useLoaderData();

  const navigate = useNavigate();

  return (
    <InputModal
      closeModal={() => navigate("/sellers")}
      heading={params.id ? "Edit a seller" : "Add a seller"}
    >
      <AddEditSeller
        edit={!!params.id}
        data={data}
        close={() => navigate("/sellers")}
      />
    </InputModal>
  );
};

export default SellerDetail;

export async function action({ request, params }) {
  const data = await request.formData();

  const customerData = {
    companyName: data.get("companyName"),
    hqAddress: data.get("hqAddress"),
    isActive: data.get("isActive"),
  };

  const response = await fetch(
    `https://640452e13bdc59fa8f365dfc.mockapi.io/sellers${
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

  return redirect("/sellers");
}

export async function loader({ params }) {
  const response = await fetch(
    `https://640452e13bdc59fa8f365dfc.mockapi.io/sellers/${params.id}`
  );

  if (!response.ok) {
    return json({ message: "Could not fetch data!" }, { status: 500 });
  } else {
    return response;
  }
}
