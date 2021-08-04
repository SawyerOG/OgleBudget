import { useState } from 'react';
import './App.css';

import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer/NavDrawer';

import AddExpenses from './containers/AddExpenses/AddExpenses';
import AddIncomes from './containers/AddIncomes/AddIncomes';

const App = () => {
	const [show, setShow] = useState(false);
	const [selectedLink, setSelectedLink] = useState('Add Expenses');

	return (
		<>
			<TopBar toggleDrawer={() => setShow((p) => !p)} />
			<NavDrawer
				isShowing={show}
				toggleDrawer={() => setShow((p) => !p)}
				selectedLink={selectedLink}
				setSelectedLink={(link: string) => setSelectedLink(link)}
			/>
			<div className='h-100 bg-info'></div>
			{selectedLink === 'Add Expenses' && <AddExpenses />}
			{selectedLink === 'Add Incomes' && <AddIncomes />}
		</>
	);
};

export default App;
