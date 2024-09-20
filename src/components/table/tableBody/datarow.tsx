import { MetersType } from '../../../mobx/models';
import { DeleteButton } from '../../basic/delButton';
import { MeterType } from '../../basic/meterType';
import './dataRow.css';

export const DataRow = (props: {
  meter: MetersType;
  limit: number;
  index: number;
  currentPage: number;
  address: string;
  deleteMeter: (meterId: string) => Promise<void>;
  // index: number
}) => {
  const handleClick = () => {
    props.deleteMeter(props.meter.id);
  };

  return (
    <tr className="table__body__row">
      <td className="row__column num">
        <span>{(props.currentPage - 1) * props.limit + props.index + 1}</span>
      </td>
      <td className="row__column type">
        <MeterType meterType={props.meter?._type[0]} />
      </td>
      <td className="row__column date">
        <span>{formatInstallationDate(props.meter.installation_date)}</span>
      </td>
      <td className="row__column auto">
        <span>{props.meter.is_automatic}</span>
      </td>
      <td className="row__column curr">
        <span>{props.meter.initial_values[0]}</span>
      </td>
      <td className="row__column addr">
        <span>{props.address}</span>
        <span></span>
      </td>
      <td className="row__column desc">
        <span>{props.meter.description}</span>
        <DeleteButton handler={handleClick} />
        {/* <span onClick={handleClick}>DELETE</span> */}
      </td>
    </tr>
  );
};

const formatInstallationDate = (date: string): string => {
  if (!date) return 'Дата не указана';
  const newDate = new Date(date);
  return newDate.toLocaleDateString('ru-RU');
};

// const formatAddress = (address: address): string => {
// 	if (!address) return 'Адрес не указан'
// 	const street = address?.strNumberFull || ''
// 	const houseAddress = address?.house?.address || ''

// 	return `${houseAddress}, ${street}`
// }
