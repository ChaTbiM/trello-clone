import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from '../services/boardApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import boardReducer from './boardSlice';

const store = configureStore({
	reducer: {
		[boardApi.reducerPath]: boardApi.reducer,
		board: boardReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(boardApi.middleware),
});

// this necessary for refetchonFocus/refetchOnReconect ( do not know if I need this but would be useful to use ( still did not define my refetching/caching policy))
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
