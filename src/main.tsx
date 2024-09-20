import { StrictMode } from 'react'
import { Container, createRoot } from 'react-dom/client'

import { App } from './App.tsx'

let container: Container | null = null

document.addEventListener('DOMContentLoaded', function () {
	if (!container) {
		container = document.getElementById('root') as HTMLElement
		const root = createRoot(container)
		root.render(
			<StrictMode>
				<App />
			</StrictMode>
		)
	}
})
