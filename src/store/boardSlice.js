import { createSlice } from '@reduxjs/toolkit';

const defaultCardProperties = {
	listId: null,
	cardTitle: '',
	cardId: '',
};

const initialState = {
	cardCreation: {
		hasInitiatedCardCreation: false,
		...defaultCardProperties,
	},
	cardUpdating: {
		hasInitiatedCardUpdating: false,
		...defaultCardProperties,
	},
};

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		// Create Card
		initiateCardCreation: (state, { payload }) => {
			state.cardCreation = {
				...initialState.cardCreation,
				listId: payload.listId,
				hasInitiatedCardCreation: true,
			};
		},
		terminateCardCreation: (state) => {
			state.cardCreation = initialState.cardCreation;
		},
		updateCreatedCardTitle: (state, { payload }) => {
			state.cardCreation.cardTitle = payload.cardTitle;
		},
		// Update Card
		initiateCardUpdating: (state, { payload }) => {
			state.cardUpdating = {
				...initialState.cardUpdating,
				cardId: payload.cardId,
				cardTitle: payload.cardTitle,
				hasInitiatedCardUpdating: true,
			};
		},
		terminateCardUpdating: (state) => {
			state.cardUpdating = initialState.cardUpdating;
		},
		updateCardTitle: (state, { payload }) => {
			state.cardUpdating.cardTitle = payload.cardTitle;
		},
	},
});

export const {
	initiateCardCreation,
	terminateCardCreation,
	updateCreatedCardTitle,
	initiateCardUpdating,
	terminateCardUpdating,
	updateCardTitle,
} = boardSlice.actions;

export default boardSlice.reducer;
