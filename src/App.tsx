import styles from './App.module.scss';
import { List } from './components/List';
import { useGetBoardQuery } from './services/boardApi';

function App() {
	const { data, error, isLoading } = useGetBoardQuery('');

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error: this most likely your FAULT -_- </p>;
	}

	if (!data?.lists?.length) return <p>You are definitely not Productive !</p>;

	return (
		<div className={styles.container}>
			{/* Header */}
			<div className={styles.header}>
				<h1>Project Management Board</h1>
			</div>
			{/* Board */}
			<div className={styles.board}>
				{data?.lists?.map((list) => {
					return <List key={list.id} title={list.name} cards={list.cards} />;
				})}
			</div>
		</div>
	);
}

export default App;
