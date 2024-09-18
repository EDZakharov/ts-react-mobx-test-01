import { Pagination } from './pagination';
import './tableFooter.css';

export const TableFooter = () => {
  return (
    <tfoot className="table__footer">
      <tr>
        <td className="table__pagination__wrapper">
          <Pagination />
        </td>
      </tr>
    </tfoot>
  );
};
