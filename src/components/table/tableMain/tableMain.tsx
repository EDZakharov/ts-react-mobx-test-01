import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../../hooks/useStore'
import { DataRow } from './datarow'
import './tableMain.css'

export type meter = {
	id: string
	areaID: string
	meterType: string
	installationDate: string
	isAutomatic: string
	initialValues: number[]
	description: string
}

export type address = {
	id: string
	strNumberFull: string
	house: { id: string; address: string }
}

const TMmain: FC = () => {
	const { zkhData } = useStore()
	const { meters, addresses } = zkhData

	const metersWithAddresses = meters?.toJSON().map((meter: meter) => {
		const address = addresses
			?.toJSON()
			.find((addr: address) => addr.id === meter.areaID)
		return {
			meter,
			address,
		}
	})

	return (
		<tbody className='table__body'>
			{metersWithAddresses &&
				metersWithAddresses.map(
					({ meter, address }: { meter: meter; address?: address }, index) => {
						return (
							<DataRow
								key={meter.id}
								meter={meter}
								address={address}
								index={index}
							/>
						)
					}
				)}
		</tbody>
	)
}

export const TableMain = observer(TMmain)
