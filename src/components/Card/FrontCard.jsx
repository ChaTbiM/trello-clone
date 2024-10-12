import PropTypes from 'prop-types';
import cardStyles from './Card.module.scss';
import styles from './FrontCard.module.scss';
import { useRef } from 'react';
import useAutoSizeTextArea from '../../hooks/useAutoSizeTextArea';
import { terminateCardUpdating, updateCardTitle } from '../../store/boardSlice';
import { useDispatch } from 'react-redux';
import useClickOutside from '../../hooks/useClickOutside';
import { useUpdateCardMutation } from '../../services/boardApi';
import { useSelector } from 'react-redux';

// const noop = () => {};
const FrontCard = ({ title }) => {
	const [updateCardTitleRequest, { error }] = useUpdateCardMutation();
	const cardId = useSelector((state) => state.board.cardUpdating)?.cardId;
	const dispatch = useDispatch();

	const textAreaRef = useRef(null);
	useAutoSizeTextArea(textAreaRef.current, title);

	const containerRef = useRef(null);
	useClickOutside(containerRef, () => dispatch(terminateCardUpdating()));

	const cardTitleChangeHandler = (e) => {
		textAreaRef.current.focus();
		dispatch(
			updateCardTitle({
				cardTitle: e.target.value,
			}),
		);
	};

	const updateCardTitleHandler = () => {
		dispatch(terminateCardUpdating());
		updateCardTitleRequest({
			title: textAreaRef.current.value,
			cardId,
		});
	};

	if (error?.data || error?.status) {
		alert(
			'An error occurred while updating the card title. Please try again later.',
		);
	}
	return (
		<div className={styles.container} ref={containerRef}>
			<div className={cardStyles.container}>
				<textarea
					ref={textAreaRef}
					data-cy="frontCard.title.editable"
					className={cardStyles.editableTitle}
					rows={1}
					value={title}
					onChange={cardTitleChangeHandler}
					placeholder={title}
				/>
			</div>
			<div className={styles.footer}>
				<button
					data-cy="frontCard.save"
					className={styles.saveButton}
					onClick={updateCardTitleHandler}
				>
					Save
				</button>
			</div>
		</div>
	);
};

FrontCard.propTypes = {
	title: PropTypes.string.isRequired,
};

export default FrontCard;
