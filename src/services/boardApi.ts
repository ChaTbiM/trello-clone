import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBoardResponse } from './types';

export const boardApi = createApi({
	reducerPath: 'boardApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://trello.dev/api/v1' }),
	tagTypes: ['Board'],
	endpoints: (builder) => ({
		getBoard: builder.query({
			query: () => ({
				method: 'GET',
				url: '/',
			}),
			providesTags: ['Board'],
			transformResponse: (response: GetBoardResponse) => response.data,
		}),
		createCard: builder.mutation({
			query: ({ listId, title }) => ({
				method: 'POST',
				url: `/list/${listId}/card/`,
				body: { title },
			}),
			invalidatesTags: ['Board'],
		}),
	}),
});

export const { useGetBoardQuery, useCreateCardMutation } = boardApi;
