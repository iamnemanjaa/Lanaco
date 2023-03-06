import React, { useEffect, useState } from "react";
import { json, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import Table from "../components/UI/Table";
import CrudActions from "../components/UI/CrudActions";
import InvoiceRow from "../components/invoices/InvoiceRow";

const Invoices = () => {
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

  const columns = ["Seller", "Customer", "Date", "Amount"];

  useEffect(() => {
    if (navigation.state === "submitting") setSelectedRows([]);
  }, [navigation.state]);

  return (
    <>
      <h1>Invoices</h1>
      <CrudActions idList={selectedRows}></CrudActions>
      <Table
        columns={columns}
        pagination={paginationData}
        setPagination={setPaginationData}
        items={data.length}
      >
        {data.map((row) => {
          const itemNr = data.indexOf(row) + 1;
          if (
            itemNr > paginationData.page * paginationData.entries ||
            itemNr <= (paginationData.page - 1) * paginationData.entries
          )
            return null;
          return (
            <InvoiceRow
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

export default Invoices;

export async function loader() {
  const invoiceResponse = await fetch(
    "https://640457763bdc59fa8f36bc0e.mockapi.io/invoices"
  );

  if (!invoiceResponse.ok) {
    return json({ message: "Could not fetch data!" }, { status: 500 });
  } else {
    return invoiceResponse;
  }
}
