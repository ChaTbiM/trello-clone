import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from '../services/boardApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
	reducer: {
		[boardApi.reducerPath]: boardApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(boardApi.middleware),
});

// this necessary for refetchonFocus/refetchOnReconect ( do not know if I need this but would be useful to use ( still did not define my refetching/caching policy))
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
