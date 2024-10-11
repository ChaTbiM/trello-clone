import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cardCreation: {
		hasInitiatedCardCreation: false,
		listId: null,
		cardTitle: '',
	},
};

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		initiateCardCreation: (state, { payload }) => {
			state.cardCreation = {
				listId: payload.listId,
				hasInitiatedCardCreation: true,
				cardTitle: '',
			};
		},
		terminateCardCreation: (state) => {
			state.cardCreation = initialState.cardCreation;
		},
		updateCreatedCardTitle: (state, { payload }) => {
			state.cardCreation.cardTitle = payload.cardTitle;
		},
	},
});

export const {
	initiateCardCreation,
	terminateCardCreation,
	updateCreatedCardTitle,
} = boardSlice.actions;

export default boardSlice.reducer;
