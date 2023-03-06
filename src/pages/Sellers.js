import React, { useEffect, useState } from "react";
import { json, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import CrudActions from "../components/UI/CrudActions";
import Table from "../components/UI/Table";
import SellerRow from "../components/sellers/SellerRow";

const Sellers = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const [paginationData, setPaginationData] = useState({ page: 1, entries: 5 });

  const navigation = useNavigation();

  const selectRowHandler = (id) => {
    const newRowSelection = [...selectedRows];
    if (newRowSelection.indexOf(id) === -1) {
      newRowSelection.push(id);
    } else newRowSelection.splice(newRowSelection.indexOf(id), 1);

    setSelectedRows(newRowSelection);
  };

  const data = useLoaderData();
  const sellers = data.sellers;

  const columns = ["Name", "Address", "Active"];

  useEffect(() => {
    if (navigation.state === "submitting") setSelectedRows([]);
  }, [navigation.state]);

  return (
    <>
      <h1>Sellers</h1>
      <CrudActions
        idList={selectedRows}
        invoices={data.invoices}
        type={"seller"}
      ></CrudActions>
      <Table
        columns={columns}
        pagination={paginationData}
        setPagination={setPaginationData}
        items={sellers.length}
      >
        {sellers.map((row) => {
          const itemNr = sellers.indexOf(row) + 1;
          if (
            itemNr > paginationData.page * paginationData.entries ||
            itemNr <= (paginationData.page - 1) * paginationData.entries
          )
            return null;
          return (
            <SellerRow
              key={row.id}
              row={row}
              selectedRows={selectedRows}
              selectRowHandler={selectRowHandler}
              columns={columns}
            />
          );
        })}
      </Table>
      <Outlet />
    </>
  );
};

export default Sellers;

export async function loader() {
  const response = await fetch(
    "https://640452e13bdc59fa8f365dfc.mockapi.io/sellers"
  );
  const invoiceResponse = await fetch(
    "https://640457763bdc59fa8f36bc0e.mockapi.io/invoices"
  );

  if (!response.ok) {
    return json({ message: "Could not fetch data!" }, { status: 500 });
  } else {
    return {
      sellers: await response.json(),
      invoices: await invoiceResponse.json(),
    };
  }
}
