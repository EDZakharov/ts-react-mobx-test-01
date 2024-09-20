import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { rootStore } from '../../../mobx/store'
import { DataRow } from './datarow'
import './tableBody.css'

export const TableBody: FC = observer(() => {
	const { meters } = rootStore

	useEffect(() => {
		rootStore.getMeters()
	}, [])

	return (
		<tbody className='table__body'>
			{(meters.length &&
				meters.map((meter) => <DataRow key={meter.id} meter={meter} />)) || (
				<tr></tr>
			)}
		</tbody>
	)
})
