import React from 'react';
import classes from "./TableAndActions.module.css";

const Table = ({columns, children, pagination, setPagination, items}) => {
  const pageUpDownEnt = (type, val) => {
    if (type === 'ADD') {
      const data = {...pagination, page: pagination.page + 1}
      setPagination(data);
    } else if (type === 'SUB') {
      const data = {...pagination, page: pagination.page - 1}
      setPagination(data);
    } else {
      const data = {...pagination, entries: +val.target.value}
      setPagination(data);
    }
  }

  const maxPage = Math.ceil(items / pagination.entries);
  return (
    <div className={classes.table}>
      <div className={classes.columns} style={{gridTemplateColumns: `repeat(${columns.length}, minmax(1rem, 1fr))`}}>
        {columns.map(col => <p key={col}>{col}</p>)}
      </div>
      <ul className={classes.list}>
        {children}
      </ul>

      <div className={classes.pagination}>
        <div onClick={pagination.page === 1 ? () => {} : () => pageUpDownEnt('SUB')} className={pagination.page === 1 ? classes.disabled : ''}><i className='bx bx-chevron-left'></i></div>
        <div>{pagination.page}</div>
        <div onClick={pagination.page === maxPage ? () => {} : () => pageUpDownEnt('ADD')} className={pagination.page === maxPage ? classes.disabled : ''}><i className='bx bx-chevron-right'></i></div>

        <select value={`${pagination.entries}`} onChange={(val) => pageUpDownEnt('ENT', val)}>
          <option value={'5'}>5</option>
          <option value={'10'}>10</option>
        </select>
      </div>
    </div>
  );
};

export default Table;