import { FC } from 'react';
import './table.css';
import { TableBody } from './tableBody/tableBody';
import { TableFooter } from './tableFooter/TableFooter';
import { TableHead } from './tableHeader/tableHeader';

export const Table: FC = () => {
  return (
    <table className="table">
      <TableHead />
      <TableBody />
      <TableFooter />
    </table>
  );
};
