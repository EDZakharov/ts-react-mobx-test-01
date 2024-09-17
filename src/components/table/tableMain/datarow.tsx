import { MeterType } from '../../basic/meterType';
import { address, meter } from './tableMain';

export const DataRow = (props: {
  meter: meter;
  address?: address;
  index: number;
}) => {
  return (
    <tr>
      <td>
        <span>{props.index + 1}</span>
      </td>
      <td>
        <MeterType type={props.meter.type} />
      </td>
      <td>
        <span>{formatInstallationDate(props.meter.installationDate)}</span>
      </td>
      <td>
        <span>{props.meter.isAutomatic === 'true' ? 'Да' : 'Нет'}</span>
      </td>
      <td>
        <span>{props.meter.initialValues[0]}</span>
      </td>
      <td>
        {/* Вывод отформатированного адреса */}
        <span>{formatAddress(props.address)}</span>
      </td>
      <td>
        <span>{props.meter.description}</span>
      </td>
    </tr>
  );
};

const formatInstallationDate = (date: string): string => {
  if (!date) return 'Дата не указана';
  const newDate = new Date(date);
  return newDate.toLocaleDateString('ru-RU');
};

const formatAddress = (address?: address): string => {
  if (!address) return 'Адрес не указан';
  const street = address?.strNumberFull || '';
  const houseAddress = address?.house?.address || '';

  return `${houseAddress}, ${street}`;
};
