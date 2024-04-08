import React from 'react';
import styles from './app.module.css';
import WidgetColumn from "./components/WidgetColumn/WidgetColumn";


function App() {
	return (
		<div className={styles.container}>
			{[1, 2, 3].map((column) => <WidgetColumn column={column}/>)}
		</div>
	);
}

export default App;
