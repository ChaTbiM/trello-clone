import PropTypes from 'prop-types';
import styles from './List.module.scss';
import { Card } from '../Card';

const List = ({ title, cards }) => {
	return (
		<div data-cy="list.container" className={styles.container}>
			<h4 data-cy="list.title" className={styles.title}>
				{title}
			</h4>
			{cards?.map((todo) => {
				return <Card key={todo.id} title={todo.title} />;
			})}
		</div>
	);
};

List.propTypes = {
	title: PropTypes.string.isRequired,
	cards: PropTypes.array.isRequired,
};
export default List;
