import React, { useState, useRef, useEffect, useContext } from 'react';
import AddItemButton from '../../components/AddItemButton';
import AddModal from './AddModal';
// import CustomToast from '../../components/Alert/Alert';

import { AlertContext } from '../../components/Alert/AlertContext';

import RecentExpenses from './RecentItems';

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

// export interface ExpenseObj {
//     groupID: IncomingExpense;
//     [key: string]: IncomingExpense;
// }

export interface ExpenseTypes {
    type: number;
    [_key: string]: number;
}

interface ExpensePayload {
    expenseTypes: ExpenseTypes;
    expenses: IncomingExpense[];
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
    const [submitting, setSubmitting] = useState(false);
    const [recentExpenses, setRecentExpenses] = useState<IncomingExpense[]>([]);

    const cats = useRef<ExpenseTypes | null>(null);
    const availableCats = useRef<ExpenseTypes | null>(null);
    const groupID = useRef<number>(0);

    const alert = useContext(AlertContext);

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
                    amts += expC[i].amount || 0;
                }

                c.total = parseFloat(amts.toFixed(2));
                c.expenses = expC;
                setCurExpense(c);
                break;
            case 'tax':
                c.tax = value;
                if (value[0] === '0') {
                    c.tax = value[1];
                }

                amts = value;
                for (let i = 0; i < c.expenses.length; i++) {
                    amts += c.expenses[i].amount || 0;
                }
                c.total = parseFloat(amts.toFixed(2));
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

    const submitExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await axios.post('/expenses/createExpense', curExpense);
            alert.showAlert('Expense Added', 'success');

            const ce = { ...curExpense };

            const c = [...recentExpenses];

            ce.groupID = data.groupID;
            ce.date = data.newDate;
            c.push(ce);

            const freshCats = { ...cats.current };
            //@ts-ignore
            availableCats.current = freshCats;

            setRecentExpenses(c);
            setCurExpense({ ...expense });
            setSubmitting(false);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteExpense = async (ID: number) => {
        try {
            const { status } = await axios.delete(`/expenses/delete/${ID}`);

            if (status === 200) {
                const c = [...recentExpenses];
                const newC = c.filter((i) => i.groupID !== ID);

                setRecentExpenses(newC);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='fs-5'>
            <AddItemButton title='Expense' onClick={() => setShowModal(true)} />
            <AddModal
                categories={availableCats.current}
                item={curExpense}
                submitting={submitting}
                updateNewExpense={updateNewExpense}
                // updateCategoryAmt={updateCategoryAmt}
                submit={submitExpense}
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                removeCategory={removeCategory}
                title='Expense'
            />
            <RecentExpenses items={recentExpenses} pageType='expense' deleteExpense={deleteExpense} />
        </div>
    );
};

export default Expenses;
