import { http, HttpResponse } from 'msw';
import data from './board';
import { nanoid } from 'nanoid';

export const handlers = [
	http.get('https://trello.dev/api/v1/', () => {
		return HttpResponse.json({ data }, { status: 200 });
	}),
	http.post(
		'https://trello.dev/api/v1/list/:id/card/',
		async ({ request, params }) => {
			const { id } = params;

			const { title, description = '', labels = [] } = await request.json();

			const createdCard = {
				id: nanoid(),
				title: title,
				description: description,
				labels: labels,
				dueDate: undefined,
				checklist: [],
				comments: [],
				isArchived: false,
				attachments: [],
			};

			data.lists.find((list) => list.id === id).cards.push(createdCard);
			return HttpResponse.json('Card Created Successfully', { status: 201 });
		},
	),
	http.put(
		'https://trello.dev/api/v1/card/:id/',
		async ({ request, params }) => {
			const { id } = params;
			console.log({ id });
			const { title } = await request.json();

			// straightforward update to the data
			data.lists.forEach((list) => {
				list.cards.forEach((card) => {
					if (card.id === id) {
						card.title = title;
					}
				});
			});

			return HttpResponse.json('Card Updated Successfully', { status: 204 });
		},
	),
];
