import { createContext, StrictMode } from 'react'
import { Container, createRoot } from 'react-dom/client'
import { App } from './app'
import RootStore from './mobx/store.ts'

const store = RootStore.create({})

export const StoreContext = createContext(store)

let container: Container | null = null

document.addEventListener('DOMContentLoaded', function () {
	if (!container) {
		container = document.getElementById('root') as HTMLElement
		const root = createRoot(container)
		root.render(
			<StrictMode>
				<StoreContext.Provider value={store}>
					<App />
				</StoreContext.Provider>
			</StrictMode>
		)
	}
})
