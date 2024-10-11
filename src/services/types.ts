export type Attachment = {
	id: string;
	filename: string;
	url: string;
};

export type Comment = {
	id: string;
	user: string;
	text: string;
	createdAt: string;
};

export type ChecklistItem = {
	id: string;
	text: string;
	isChecked: boolean;
};

export type Card = {
	id: string;
	title: string;
	description: string;
	labels: string[];
	dueDate: string;
	checklist: ChecklistItem[];
	comments: Comment[];
	isArchived: boolean;
	attachments: Attachment[];
};

export type List = {
	id: string;
	name: string;
	position: number;
	cards: Card[];
};

export type ProjectBoard = {
	disclaimer: string;
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	lists: List[];
};

export type transformedGenericResponse<T> = {
	data: T;
};

export type GetBoardResponse = transformedGenericResponse<ProjectBoard>;
