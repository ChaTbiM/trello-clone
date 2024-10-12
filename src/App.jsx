import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import { List } from './components/List';
import { useGetBoardQuery } from './services/boardApi';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

function App() {
	const { data, error, isLoading } = useGetBoardQuery('');
	const { hasInitiatedCardUpdating } = useSelector(
		(state) => state.board.cardUpdating,
	);

	const [lists, setLists] = useState([]); // Use local state to track lists

	useEffect(() => {
		if (data?.lists) {
			setLists(data.lists); // Update local state with fetched data if available
		}
	}, [data?.lists]);

	const onDragEnd = (result) => {
		if (!result.destination) return; // Check if the destination is valid

		const { source, destination } = result;
		// Handle moving cards within the same list
		if (source.droppableId === destination.droppableId) {
			const listId = source.droppableId;
			const list = lists.find((list) => list.id === listId);
			const newCards = Array.from(list.cards);
			const [removed] = newCards.splice(source.index, 1);
			newCards.splice(destination.index, 0, removed);

			setLists((prevLists) =>
				prevLists.map((l) => (l.id === listId ? { ...l, cards: newCards } : l)),
			);
		} else {
			// Handle moving cards between different lists
			const sourceList = lists.find((list) => list.id === source.droppableId);
			const destList = lists.find(
				(list) => list.id === destination.droppableId,
			);

			const sourceCards = Array.from(sourceList.cards);
			const [removed] = sourceCards.splice(source.index, 1);

			const destCards = Array.from(destList.cards);
			destCards.splice(destination.index, 0, removed);

			setLists((prevLists) =>
				prevLists.map((list) => {
					if (list.id === source.droppableId) {
						return { ...list, cards: sourceCards };
					}
					if (list.id === destination.droppableId) {
						return { ...list, cards: destCards };
					}
					return list;
				}),
			);
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error: this most likely your FAULT -_- </p>;
	}

	if (!data?.lists?.length) return <p>You are definitely not Productive!</p>;

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.container}>
				{hasInitiatedCardUpdating && <div className={styles.overlay} />}
				{/* Header */}
				<div className={styles.header}>
					<h1>Project Management Board</h1>
				</div>
				{/* Board */}
				<div className={styles.board}>
					{lists?.map((list) => (
						<Droppable key={list.id} droppableId={list.id}>
							{(provided) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<List id={list.id} title={list.name} cards={list.cards} />
									{provided.placeholder} {/* Placeholder for spacing */}
								</div>
							)}
						</Droppable>
					))}
				</div>
			</div>
		</DragDropContext>
	);
}

export default App;
