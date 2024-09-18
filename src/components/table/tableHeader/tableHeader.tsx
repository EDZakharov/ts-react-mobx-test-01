import './tableHeader.css';

export const TableHead = () => {
  return (
    <thead className="table__header">
      <tr className="header__row">
        <th className="header__row__column num">
          <span>№</span>
        </th>
        <th className="header__row__column type">
          <span>Тип</span>
        </th>
        <th className="header__row__column date">
          <span>Дата установки</span>
        </th>
        <th className="header__row__column auto">
          <span>Автоматический</span>
        </th>
        <th className="header__row__column curr">
          <span>Текущие показания</span>
        </th>
        <th className="header__row__column addr">
          <span>Адрес</span>
        </th>
        <th className="header__row__column desc">
          <span>Примечание</span>
        </th>
      </tr>
    </thead>
  );
};
