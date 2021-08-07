import React, { useState, useRef } from 'react';
import AddItemButton from '../../components/AddItemButton';
import AddModal from '../../components/Modal/AddModal';

import RecentItems from '../RecentItems/RecentItems';

import { DateTime } from 'luxon';
import { MoneyItem, MoneyType } from '../interfaces';

const income = {
    date: DateTime.now(),
    note: '',
    amount: '',
    categories: [],
} as MoneyItem;

const categories = ['Work', 'Rebate', 'Coupon', 'Sale'];

const AddIncomes = () => {
    const [showModal, setShowModal] = useState(false);
    const [curIncome, setCurIncome] = useState<MoneyItem>({ ...income });
    const [submitting, setSubmitting] = useState(false);

    const cats = useRef([...categories]);

    const closeModal = () => {
        setShowModal(false);
    };

    const submitIncome = async () => {
        console.log(curIncome);
    };

    const updateIncome = (type: MoneyType, value: any) => {
        const c = { ...curIncome };
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
        setCurIncome(c);
    };

    const removeCategories = (category: MoneyType) => {
        const c = { ...curIncome };
        const cc = [...c.categories].filter((i) => i !== category);

        cats.current.push(category);
        c.categories = cc;
        setCurIncome(c);
    };

    return (
        <div className='fs-5'>
            <AddItemButton title='Add Income' onClick={() => setShowModal(true)} />
            <AddModal
                showModal={showModal}
                closeModal={closeModal}
                item={curIncome}
                removeCategories={removeCategories}
                submit={submitIncome}
                submitting={submitting}
                categories={categories}
                updateItem={updateIncome}
                title='Income'
            />
            <RecentItems />
        </div>
    );
};

export default AddIncomes;
