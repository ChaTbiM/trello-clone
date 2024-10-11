import { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import useAutoSizeTextArea from '../../hooks/useAutoSizeTextArea';
import { useDispatch } from 'react-redux';
import { updateCreatedCardTitle } from '../../store/boardSlice';

const Card = ({ title, isEditable = false }) => {
	const dispatch = useDispatch();
	const textAreaRef = useRef(null);
	useAutoSizeTextArea(textAreaRef.current, title);
	const cardTitleChangeHandler = (e) => {
		dispatch(
			updateCreatedCardTitle({
				cardTitle: e.target.value,
			}),
		);
	};

	return (
		<div data-cy="card.container" className={styles.container}>
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
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	isEditable: PropTypes.bool.isRequired,
};

export default Card;
