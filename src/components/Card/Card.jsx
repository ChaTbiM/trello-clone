import { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import useAutoSizeTextArea from '../../hooks/useAutoSizeTextArea';
import { useDispatch } from 'react-redux';
import { updateCreatedCardTitle } from '../../store/boardSlice';
import editSvg from '../../assets/edit.svg';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const noop = () => {};

const Card = ({ title, isEditable = false, onEditClick = noop }) => {
	const dispatch = useDispatch();
	const cardUpdateState = useSelector((state) => state.board.cardUpdating);
	const cardToUpdateId = cardUpdateState?.cardId;
	const isUpdatingCard =
		cardToUpdateId && cardUpdateState?.hasInitiatedCardUpdating;

	const textAreaRef = useRef(null);
	useAutoSizeTextArea(textAreaRef.current, title);

	const cardTitleChangeHandler = (e) => {
		textAreaRef.current.focus();
		dispatch(
			updateCreatedCardTitle({
				cardTitle: e.target.value,
			}),
		);
	};

	return (
		<div
			data-cy="card.container"
			className={clsx(styles.container, {
				[styles.highestZIndex]: isUpdatingCard && isEditable,
			})}
		>
			{isEditable ? (
				<textarea
					ref={textAreaRef}
					className={styles.editableTitle}
					data-cy="card.title.editable"
					rows={1}
					value={title}
					onChange={cardTitleChangeHandler}
					placeholder="Enter card title..."
				/>
			) : (
				<p data-cy="card.title">{title}</p>
			)}
			{!isUpdatingCard && !isEditable && (
				<button
					data-cy="edit.card.button"
					className={styles.editCardButton}
					onClick={onEditClick}
				>
					<img
						className={styles.editCardImg}
						src={editSvg}
						alt="Edit Card Title"
					/>
				</button>
			)}
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	isEditable: PropTypes.bool.isRequired,
	onEditClick: PropTypes.func,
};

export default Card;
