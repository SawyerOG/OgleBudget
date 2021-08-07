import React, { useState, useRef } from 'react';
import AddItemButton from '../../components/AddItemButton';
import CustomToast from '../../components/Alert/Alert';
import AddModal from '../../components/Modal/AddModal';

import RecentExpenses from '../RecentItems/RecentItems';

import { DateTime } from 'luxon';
import { MoneyItem, MoneyType } from '../interfaces';

const expense = {
    categories: [],
    date: DateTime.now(),
    note: '',
    amount: '',
} as MoneyItem;

const categories = ['Grocery', 'Alcohol', 'House Dev', 'Hobbies', 'Mortgage'];

const Expenses = () => {
    const [showModal, setShowModal] = useState(false);
    const [curExpense, setCurExpense] = useState<MoneyItem>({ ...expense });
    const [submitting, setSubmitting] = useState(false);
    const [showToast, setShowToast] = useState<'success' | 'warning' | ''>('');
    // const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);

    const cats = useRef([...categories]);

    const updateExpense = (type: MoneyType, value: any) => {
        const c: MoneyItem = { ...curExpense };
        switch (type) {
            case 'date':
                c.date = DateTime.local(value);
                break;
            case 'category':
                const cc = [...c.categories];
                cc.push(value);
                break;
            default:
                c[type] = value;
                break;
        }
        setCurExpense(c);
    };

    const removeCategories = (category: MoneyType) => {
        const c = { ...curExpense };
        const cc = [...c.categories].filter((i) => i !== category);

        cats.current.push(category);
        c.categories = cc;
        setCurExpense(c);
    };

    const closeModal = () => {
        setShowModal(false);
        cats.current = [...categories];
        setCurExpense({ ...expense });
    };

    const submitExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitting(true);
        setShowToast('success');

        try {
            setTimeout(() => {
                cats.current = [...categories];
                // const recEx = [...recentExpenses];
                // recEx.push(curExpense);
                setShowToast('');
                setCurExpense({ ...expense });
                setSubmitting(false);
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    };

    const noshow = () => {
        setShowToast('');
    };

    return (
        <div className='fs-5'>
            <AddItemButton title='Add Expense' onClick={() => setShowModal(true)} />
            <CustomToast variant={'success'} message={showToast} showTime={2000} noshow={noshow} />
            <AddModal
                categories={cats.current}
                item={curExpense}
                submitting={submitting}
                updateItem={updateExpense}
                submit={submitExpense}
                showModal={showModal}
                closeModal={closeModal}
                removeCategories={removeCategories}
                title='Expense'
            />
            <RecentExpenses />
        </div>
    );
};

export default Expenses;
