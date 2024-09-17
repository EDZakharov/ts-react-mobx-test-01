import { FC } from 'react';
import { TableHead } from './tableHeader/tableHeader';
import { TableMain } from './tableMain/tableMain';

export const Table: FC = () => {
  return (
    <table>
      <TableHead />
      <TableMain />
    </table>
  );
};
