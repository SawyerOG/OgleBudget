import React, { useState, useRef } from 'react';
import AddItemButton from '../../components/AddItemButton';
import AddModal from '../../components/Modal/AddModal';
import CustomToast from '../../components/Alert/Alert';

import RecentItems from '../RecentItems/RecentItems';

// import { DateTime } from 'luxon';
import { MoneyItem, MoneyType } from '../interfaces';

const income = {
    id: '',
    date: new Date(),
    note: '',
    tax: '',
    total: 0,
    categories: [],
} as MoneyItem;

const categories = ['Work', 'Rebate', 'Coupon', 'Sale'];

const AddIncomes = () => {
    const [showModal, setShowModal] = useState(false);
    const [curIncome, setCurIncome] = useState<MoneyItem>({ ...income });
    const [submitting, setSubmitting] = useState(false);
    const [showToast, setShowToast] = useState<'success' | 'warning' | ''>('');
    const [recentIncomes, setRecentIncomes] = useState<MoneyItem[]>([]);

    const cats = useRef([...categories]);

    const updateIncome = (type: MoneyType, value: any, categoryType?: string | null) => {
        const c = { ...curIncome };
        console.log(value);

        switch (type) {
            case 'date':
                c.date = value;
                break;
            case 'category':
                const cc = [...c.categories];
                cc.push({ type: value, amount: '' });
                c.categories = cc;
                cats.current = cats.current.filter((i) => i !== value);
                break;
            default:
                c[type] = value;
                break;
        }

        setCurIncome(c);
    };

    const updateCategoryAmt = (category: string, amount: string) => {
        const c: MoneyItem = { ...curIncome };
        const cc = [...c.categories];

        for (const i of cc) {
            if (i.type === category) {
                i.amount = amount;
            }
        }

        c.categories = cc;
        setCurIncome(c);
    };

    const removeCategories = (category: MoneyType) => {
        const c = { ...curIncome };
        const cc = [...c.categories].filter((i) => i.type !== category);

        cats.current.push(category);
        c.categories = cc;
        setCurIncome(c);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const submitIncome = async (e: React.FormEvent<HTMLFormElement>, total: number) => {
        e.preventDefault();

        setSubmitting(true);
        setShowToast('success');

        const c = { ...curIncome };
        c.total = total;

        try {
            setTimeout(() => {
                cats.current = [...categories];
                const recIn = [...recentIncomes];
                recIn.push(c);
                setRecentIncomes(recIn);
                setShowToast('');
                setCurIncome({ ...income });
                setSubmitting(false);
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    };

    const noshow = () => {
        setShowToast('');
    };

    const setIncomes = (items: MoneyItem[]) => {
        setRecentIncomes(items);
    };

    return (
        <div className='fs-5'>
            <AddItemButton title='Add Income' onClick={() => setShowModal(true)} />
            <CustomToast variant={'success'} message={showToast} showTime={2000} noshow={noshow} />
            <AddModal
                showModal={showModal}
                closeModal={closeModal}
                item={curIncome}
                removeCategories={removeCategories}
                submit={submitIncome}
                submitting={submitting}
                categories={cats.current}
                updateItem={updateIncome}
                updateCategoryAmt={updateCategoryAmt}
                title='income'
            />
            <RecentItems updateRecentItems={setIncomes} items={recentIncomes} pageType='income' />
        </div>
    );
};

export default AddIncomes;
