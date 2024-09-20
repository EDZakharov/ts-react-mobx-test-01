import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { rootStore } from '../../../mobx/store';
import { DataRowSkeleton } from '../../basic/dataRowSkeleton';
import { DataRow } from './datarow';
import './tableBody.css';

export const TableBody: FC = observer(() => {
  const { meters, currentPage, isLoading, areas, deleteMeter } = rootStore;
  const arrPlaceholder = [...Array(20).keys()];
  const areaMap = new Map(areas.map((area) => [area.id, area.address]));

  useEffect(() => {
    rootStore.getMeters();
  }, [currentPage]);

  return (
    <tbody className="table__body">
      {isLoading ? (
        arrPlaceholder.map((el: number) => <DataRowSkeleton key={el} />)
      ) : meters.length ? (
        meters.map((meter, index) => {
          const areaId = meter.area ? meter.area.id : null;
          const address = areaId
            ? areaMap.get(areaId) || 'Unknown address'
            : 'Unknown address';
          return (
            <DataRow
              key={meter.id}
              meter={meter}
              limit={rootStore.limit}
              currentPage={rootStore.currentPage}
              index={index}
              address={address}
              deleteMeter={deleteMeter}
            />
          );
        })
      ) : (
        <tr>
          <td colSpan={5}>No data available</td>
        </tr>
      )}
    </tbody>
  );
});
