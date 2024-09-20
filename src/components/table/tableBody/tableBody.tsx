import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { rootStore } from '../../../mobx/store'
import { DataRow } from './datarow'
import './tableBody.css'

export const TableBody: FC = observer(() => {
	const { meters } = rootStore

	// useEffect(() => {
	// 	rootStore.getMeters()
	// }, [])

	return (
		<tbody className='table__body'>
			{(meters.length &&
				meters.map((meter, index) => (
					<DataRow
						key={meter.id}
						meter={meter}
						limit={rootStore.limit}
						currentPage={rootStore.currentPage}
						index={index}
					/>
				))) || <tr></tr>}
		</tbody>
	)
})
