import React, { useState, Suspense, lazy } from 'react';
import './App.css';

import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer/NavDrawer';

import Alert from './components/Alert/Alert';

const Expenses = lazy(() => import('./containers/AddExpenses/Expenses'));
const AddIncomes = lazy(() => import('./containers/AddIncomes/Incomes'));
const EditCategory = lazy(() => import('./containers/EditCategory/EditCats'));
const MonthlyRundown = lazy(() => import('./containers/MonthlyRundown/MonthlyRundown'));

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
            <Suspense fallback={<div>Loading...</div>}>
                {selectedLink === 'Add Expenses' && <Expenses />}
                {selectedLink === 'Add Incomes' && <AddIncomes />}
                {selectedLink === 'Edit Categories' && <EditCategory />}
                {selectedLink === 'Monthly Rundown' && <MonthlyRundown />}
            </Suspense>
        </>
    );
};

export default App;
