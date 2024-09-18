import { MeterType } from '../../basic/meterType'
import './dataRow.css'
import { address, meter } from './tableMain'

export const DataRow = (props: {
	meter: meter
	address?: address
	index: number
}) => {
	return (
		<tr className='table__body__row'>
			<td className='row__column'>
				<span>{props.index + 1}</span>
			</td>
			<td className='row__column'>
				<MeterType meterType={props.meter?.meterType} />
			</td>
			<td className='row__column'>
				<span>{formatInstallationDate(props.meter.installationDate)}</span>
			</td>
			<td className='row__column'>
				<span>{props.meter.isAutomatic === 'true' ? 'Да' : 'Нет'}</span>
			</td>
			<td className='row__column'>
				<span>{props.meter.initialValues[0]}</span>
			</td>
			<td className='row__column'>
				<span>{formatAddress(props.address)}</span>
			</td>
			<td className='row__column'>
				<span>{props.meter.description}</span>
			</td>
		</tr>
	)
}

const formatInstallationDate = (date: string): string => {
	if (!date) return 'Дата не указана'
	const newDate = new Date(date)
	return newDate.toLocaleDateString('ru-RU')
}

const formatAddress = (address?: address): string => {
	if (!address) return 'Адрес не указан'
	const street = address?.strNumberFull || ''
	const houseAddress = address?.house?.address || ''

	return `${houseAddress}, ${street}`
}
