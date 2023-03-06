import React from 'react';
import classes from "../UI/TableAndActions.module.css";
import {format} from "date-fns";

const InvoiceRow = ({row, selectedRows, selectRowHandler, columns}) => {
  return (
    <li className={selectedRows.indexOf(row.id) !== -1 ? classes.active : ''}
        onClick={() => selectRowHandler(row.id)} style={{gridTemplateColumns: `repeat(${columns.length}, minmax(1rem, 1fr))`}}>
      <p>{row['sellerName']}</p>
      <p>{row['customerName']}</p>
      <p>{format(new Date(row['date']), 'dd.MM.yyyy')}</p>
      <p>{row['amount']}</p>
    </li>
  );
};

export default InvoiceRow;