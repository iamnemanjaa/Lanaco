import React from 'react';
import classes from "../UI/TableAndActions.module.css";

const SellerRow = ({row, selectedRows, selectRowHandler, columns}) => {
  return (
    <li className={selectedRows.indexOf(row.id) !== -1 ? classes.active : ''}
        onClick={() => selectRowHandler(row.id)} style={{gridTemplateColumns: `repeat(${columns.length}, minmax(1rem, 1fr))`}}>
      <p>{row['companyName']}</p>
      <p>{row['hqAddress']}</p>
      <p>{row['isActive']}</p>
    </li>
  );
};

export default SellerRow;