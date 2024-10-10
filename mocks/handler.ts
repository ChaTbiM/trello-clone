import { http, HttpResponse } from 'msw';
import data from './board';

export const handlers = [
	http.get('https://trello.dev/api/v1/', () => {
		return HttpResponse.json({ data });
	}),
];
