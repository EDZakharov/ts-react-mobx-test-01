import { observer } from 'mobx-react-lite'
import { SyntheticEvent, useEffect } from 'react'
import { rootStore } from '../../../mobx/store'

export const Pagination = observer(() => {
	const { currentPage, setPage } = rootStore

	useEffect(() => {
		setPage(rootStore.currentPage)
	}, [currentPage, setPage])

	const clickHandler = (e: SyntheticEvent) => {
		setPage(2)
	}

	return <div onClick={clickHandler}>1, 2, 3, 4, 5</div>
})
