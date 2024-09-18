import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import './App.css'
import { Table } from './components/table/table'

const MyApp: FC = () => {
	return (
		<section className='section__wrapper'>
			<h1 className='section__wrapper__tittle'>Список счётчиков</h1>
			<Table />
		</section>
	)
}

export const App = observer(MyApp)
