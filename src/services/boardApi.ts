import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBoardResponse } from './types';

export const boardApi = createApi({
	reducerPath: 'boardApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://trello.dev/api/v1' }),
	endpoints: (builder) => ({
		getBoard: builder.query({
			query: () => ({
				method: 'GET',
				url: '/',
			}),
			transformResponse: (response: GetBoardResponse) => response.data,
		}),
	}),
});

export const { useGetBoardQuery } = boardApi;
