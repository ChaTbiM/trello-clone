import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/index.ts';

async function enableMocking() {
	if (import.meta.env.MODE === 'production') {
		return;
	}

	const { worker } = await import('../mocks/browser.js');

	return worker.start();
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>,
	);
});
