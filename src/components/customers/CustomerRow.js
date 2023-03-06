import React from 'react';
import classes from "../UI/TableAndActions.module.css";

const CustomerRow = ({row, selectedRows, selectRowHandler, columns}) => {
  return (
    <li className={selectedRows.indexOf(row.id) !== -1 ? classes.active : ''}
        onClick={() => selectRowHandler(row.id)} style={{gridTemplateColumns: `repeat(${columns.length}, minmax(1rem, 1fr))`}}>
      <p>{row['name']}</p>
      <p>{row['surename']}</p>
      <p>{row['address']}</p>
      <p>{row['age']}</p>
    </li>
  );
};

export default CustomerRow;