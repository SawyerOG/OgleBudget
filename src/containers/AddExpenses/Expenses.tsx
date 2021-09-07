import React, { useState, useRef, useEffect } from 'react';
import AddItemButton from '../../components/AddItemButton';
import AddModal from '../../components/Modal/AddModal';
// import CustomToast from '../../components/Alert/Alert';

import RecentExpenses from '../RecentItems/RecentItems';

import axios from 'axios';

export interface Expense {
    type: string;
    amount: number;
    typeID?: number;
}

export interface IncomingExpense {
    groupID: number;
    amount: number;
    date: Date;
    note: string;
    total: number;
    tax: number;
    expenses: Expense[] | [];
    expenseTypes: string[] | [];
}

export interface ExpenseObj {
    groupID: IncomingExpense;
    [key: string]: IncomingExpense;
}

export interface ExpenseTypes {
    type: number;
    [_key: string]: number;
}

interface ExpensePayload {
    expenseTypes: ExpenseTypes;
    expenses: ExpenseObj;
    maxGroupID: number;
}

const expense = {
    groupID: 0,
    date: new Date(),
    note: '',
    tax: 0,
    total: 0,
    expenses: [],
    expenseTypes: [],
} as IncomingExpense;

const Expenses = () => {
    const [showModal, setShowModal] = useState(false);
    const [curExpense, setCurExpense] = useState<IncomingExpense>({ ...expense });
    // const [submitting, setSubmitting] = useState(false);
    // const [showToast, setShowToast] = useState<'success' | 'warning' | ''>('');
    const [recentExpenses, setRecentExpenses] = useState<ExpenseObj | null>(null);

    const cats = useRef<ExpenseTypes | null>(null);
    const availableCats = useRef<ExpenseTypes | null>(null);
    const groupID = useRef<number>(0);

    useEffect(() => {
        axios
            .get('/expenses/getRecentExpenses')
            .then((res) => {
                if (res.status === 200) {
                    const { expenseTypes, expenses, maxGroupID } = res.data as ExpensePayload;

                    cats.current = expenseTypes;
                    availableCats.current = expenseTypes;
                    groupID.current = maxGroupID;

                    setRecentExpenses(expenses);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const updateNewExpense = (type: 'category' | 'expense' | 'date' | 'note' | 'tax', value: any, index?: number) => {
        const c = { ...curExpense };
        let amts = c.tax;
        switch (type) {
            case 'category':
                const newExpenses: Expense[] = [...c.expenses];
                const newExpenseTypes: string[] = [...c.expenseTypes];

                newExpenses.push({ type: value, amount: 0, typeID: cats.current![value] });
                newExpenseTypes.push(value);

                c.expenses = newExpenses;
                c.expenseTypes = newExpenseTypes;

                //@ts-ignore
                const availableCatsCopy: ExpenseTypes = { ...availableCats.current };
                delete availableCatsCopy[value];
                availableCats.current = availableCatsCopy;

                setCurExpense(c);
                break;
            case 'expense':
                const expC = [...c.expenses];
                expC[index!].amount = value;

                for (let i = 0; i < expC.length; i++) {
                    amts += expC[i].amount;
                }

                c.total = amts;
                c.expenses = expC;
                setCurExpense(c);
                break;
            case 'tax':
                c.tax = value;
                amts = value;
                for (let i = 0; i < c.expenses.length; i++) {
                    amts += c.expenses[i].amount;
                }
                c.total = amts;
                setCurExpense(c);
                break;
            default:
                //@ts-ignore
                c[type] = value;
                setCurExpense(c);
                break;
        }
    };

    const removeCategory = (type: string) => {
        const catsCopy = { ...cats.current };
        availableCats.current![type] = catsCopy[type];

        const expC = { ...curExpense };
        const c = [];

        for (let i = 0; i < expC.expenses.length; i++) {
            if (expC.expenses[i].type === type) {
                expC.total -= expC.expenses[i].amount;
            } else {
                c.push(expC.expenses[i]);
            }
        }

        expC.expenses = c;
        setCurExpense(expC);
    };

    // const noshow = () => {
    //     setShowToast('');
    // };

    return (
        <div className='fs-5'>
            <AddItemButton title='Add Expense' onClick={() => setShowModal(true)} />
            {/* <CustomToast variant={'success'} message={showToast} showTime={2000} noshow={noshow} /> */}
            <AddModal
                categories={availableCats.current}
                item={curExpense}
                submitting={true}
                updateNewExpense={updateNewExpense}
                // updateCategoryAmt={updateCategoryAmt}
                // submit={submitExpense}
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                removeCategory={removeCategory}
                title='expense'
            />
            <RecentExpenses items={recentExpenses} pageType='expense' />
        </div>
    );
};

export default Expenses;
