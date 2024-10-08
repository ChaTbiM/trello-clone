import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.ts'

async function enableMocking() {
	if (import.meta.env.MODE !== 'development') {
		return
	}

	const { worker } = await import('./mocks/browser')

	return worker.start()
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>,
	)
})
