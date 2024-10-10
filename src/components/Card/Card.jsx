import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ title }) => {
	return (
		<div data-cy="card.container" className={styles.container}>
			<p data-cy="card.title">{title}</p>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Card;
