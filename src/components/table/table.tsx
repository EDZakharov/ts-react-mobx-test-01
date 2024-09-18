import { FC } from 'react'
import './table.css'
import { TableHead } from './tableHeader/tableHeader'
import { TableMain } from './tableMain/tableMain'

export const Table: FC = () => {
	return (
		<table className='table'>
			<TableHead />
			<TableMain />
		</table>
	)
}
