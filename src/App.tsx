import { FC } from 'react'
import './App.css'
import { Table } from './components/table/table'

export const App: FC = () => {
	return (
		<main className='main'>
			<section className='main_section'>
				<h1 className='section__tittle'>Список счётчиков</h1>
				<Table />
			</section>
		</main>
	)
}
