import './dataRowSkeleton.css';

export const DataRowSkeleton = () => {
  return (
    <tr className="table__body__row">
      <td className="row__column num">
        <span className="skeleton"></span>
      </td>
      <td className="row__column type">
        <span className="skeleton"></span>
      </td>
      <td className="row__column date">
        <span className="skeleton"></span>
      </td>
      <td className="row__column auto">
        <span className="skeleton"></span>
      </td>
      <td className="row__column curr">
        <span className="skeleton"></span>
      </td>
      <td className="row__column addr">
        <span className="skeleton"></span>
      </td>
      <td className="row__column desc">
        <span className="skeleton"></span>
      </td>
    </tr>
  );
};
