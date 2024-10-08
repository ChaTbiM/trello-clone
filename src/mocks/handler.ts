import { http, HttpResponse } from 'msw'

export const handlers = [
	http.get('https://trello.dev/api/v1', () => {
		return HttpResponse.json('api')
	}),
]
