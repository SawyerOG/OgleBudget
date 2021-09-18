import { useState } from 'react';
import './App.css';

import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer/NavDrawer';

import Alert from './components/Alert/Alert';

import Expenses from './containers/AddExpenses/Expenses';
import AddIncomes from './containers/AddIncomes/Incomes';
import MonthlyRundown from './containers/MonthlyRundown/MonthlyRundown';

const App = () => {
    const [show, setShow] = useState(true);
    const [selectedLink, setSelectedLink] = useState('');

    return (
        <>
            <TopBar toggleDrawer={() => setShow((p) => !p)} />
            <NavDrawer
                isShowing={show}
                toggleDrawer={() => setShow((p) => !p)}
                selectedLink={selectedLink}
                setSelectedLink={(link: string) => setSelectedLink(link)}
            />
            <Alert />
            {/* <div className='h-100 bg-info'></div> */}
            {selectedLink === 'Add Expenses' && <Expenses />}
            {selectedLink === 'Add Incomes' && <AddIncomes />}
            {selectedLink === 'Monthly Rundown' && <MonthlyRundown />}
        </>
    );
};

export default App;
