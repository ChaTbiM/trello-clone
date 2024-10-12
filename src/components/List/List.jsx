import PropTypes from 'prop-types';
import styles from './List.module.scss';
import plusSvg from '../../assets/plus.svg';
import closeSvg from '../../assets/close.svg';
import { Card } from '../Card';
import { useSelector, useDispatch } from 'react-redux';
import {
	initiateCardCreation,
	initiateCardUpdating,
	terminateCardCreation,
	updateCreatedCardTitle,
} from '../../store/boardSlice';
import { useCreateCardMutation } from '../../services/boardApi';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import FrontCard from '../Card/FrontCard';

const List = ({ id, title, cards }) => {
	const dispatch = useDispatch();
	const cardCreationState = useSelector((state) => state.board.cardCreation);
	const createdCardTitle = cardCreationState?.cardTitle;
	const isAddingCardInitiated =
		id === cardCreationState?.listId &&
		cardCreationState?.hasInitiatedCardCreation;

	const cardUpdateState = useSelector((state) => state.board.cardUpdating);
	const cardUpdatedTitle = cardUpdateState?.cardTitle;
	const cardToUpdateId = cardUpdateState?.cardId;
	const isUpdatingCard =
		cardToUpdateId && cardUpdateState?.hasInitiatedCardUpdating;

	const [createCardRequest, { error }] = useCreateCardMutation();
	const triggerInitCardCreation = () =>
		dispatch(initiateCardCreation({ listId: id }));

	const initiateCreateCard = () => {
		triggerInitCardCreation();
	};

	const closeCardCreation = () => {
		dispatch(terminateCardCreation());
	};

	const createdCardTitleChange = (e) => {
		dispatch(
			updateCreatedCardTitle({
				cardTitle: e.target.value,
			}),
		);
	};

	const createCardHandler = () => {
		if (createdCardTitle.length === 0) {
			alert('Card title cannot be empty! Please enter a title.');
			return;
		}
		createCardRequest({ listId: id, title: createdCardTitle });
	};

	// Error handling
	if (error?.data || error?.status) {
		console.log({ error });
		alert('An error occurred while creating the card. Please try again later.');
	}

	const triggerUpdateCardTitle = (cardId, currentCardTitle) => {
		dispatch(initiateCardUpdating({ cardId, cardTitle: currentCardTitle }));
	};

	return (
		<Droppable droppableId={id}>
			{(provided) => (
				<div
					data-cy="list.container"
					className={styles.container}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<h4 data-cy="list.title" className={styles.title}>
						{title}
					</h4>
					{cards?.map((card, index) => (
						<Draggable key={card.id} draggableId={card.id} index={index}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									{cardToUpdateId === card.id && isUpdatingCard ? (
										<div
											key={`${card.id}-container`}
											style={{ position: 'relative' }}
										>
											<Card
												key={`${card.id}-card`}
												title={cardUpdatedTitle}
												isEditable={false}
											/>
											<FrontCard
												key={`${card.id}-front`}
												title={cardUpdatedTitle}
											/>
										</div>
									) : (
										<Card
											title={
												card.id === cardToUpdateId && isUpdatingCard
													? cardUpdatedTitle
													: card.title
											}
											isEditable={false}
											onEditClick={() =>
												triggerUpdateCardTitle(card.id, card.title)
											}
										/>
									)}
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder} {/* Placeholder for spacing */}
					{isAddingCardInitiated && (
						<Card
							title={createdCardTitle}
							isEditable={true}
							onCardTitleChange={createdCardTitleChange}
						/>
					)}
					<div className={styles.footer}>
						{isAddingCardInitiated && (
							<div className={styles.addCardButtonContainer}>
								<button
									data-cy="list.createCardButton"
									className={styles.addCardButton}
									onClick={createCardHandler}
								>
									<p className={styles.addCardButtonText}>Add Card</p>
								</button>
								<button
									data-cy="list.closeCreateCardButton"
									className={styles.addCardCloseButton}
									onClick={closeCardCreation}
								>
									<img
										className={styles.addCardImg}
										alt="Close Adding Cards"
										src={closeSvg}
										target="_blank"
										rel="noreferrer"
									/>
								</button>
							</div>
						)}
						{!isAddingCardInitiated && (
							<button
								data-cy="list.initiateCreateCardButton"
								className={styles.initiateCreateCardButton}
								onClick={initiateCreateCard}
							>
								<img
									className={styles.initiateCreateCardButtonImg}
									alt="Add a card"
									src={plusSvg}
									target="_blank"
									rel="noreferrer"
								/>
								<p className={styles.initiateCreateCardButtonText}>
									Add a Card
								</p>
							</button>
						)}
					</div>
				</div>
			)}
		</Droppable>
	);
};

List.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	cards: PropTypes.array.isRequired,
};

export default List;
