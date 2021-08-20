import React, { useState, useRef, useCallback } from 'react';
import AddItemButton from '../../components/AddItemButton';
import CustomToast from '../../components/Alert/Alert';
import AddModal from '../../components/Modal/AddModal';

import RecentExpenses from '../RecentItems/RecentItems';

import axios from 'axios';

import { MoneyItem, MoneyType } from '../interfaces';

const expense = {
	categories: [],
	date: new Date(),
	note: '',
	tax: '',
	total: 0,
} as MoneyItem;

const categories = ['Grocery', 'Alcohol', 'House Dev', 'Hobbies', 'Mortgage'];

const Expenses = () => {
	const [showModal, setShowModal] = useState(false);
	const [curExpense, setCurExpense] = useState<MoneyItem>({ ...expense });
	const [submitting, setSubmitting] = useState(false);
	const [showToast, setShowToast] = useState<'success' | 'warning' | ''>('');
	const [recentExpenses, setRecentExpenses] = useState<MoneyItem[]>([]);

	const cats = useRef([...categories]);

	const updateExpense = (type: MoneyType, value: any, categoryType?: string | null) => {
		const c: MoneyItem = { ...curExpense };
		const cc = [...c.categories];
		switch (type) {
			case 'date':
				c.date = value;
				break;
			case 'category':
				cc.push({ type: value, amount: '' });
				c.categories = cc;
				cats.current = cats.current.filter((i) => i !== value);
				break;
			default:
				c[type] = value;
				break;
		}

		setCurExpense(c);
	};

	const updateCategoryAmt = (category: string, amount: string) => {
		const c: MoneyItem = { ...curExpense };
		const cc = [...c.categories];

		console.log(cc);

		for (const i of cc) {
			if (i.type === category) {
				i.amount = amount;
			}
		}

		c.categories = cc;
		setCurExpense(c);
	};

	const removeCategories = (category: MoneyType) => {
		const c = { ...curExpense };
		const cc = [...c.categories].filter((i) => i.type !== category);

		cats.current.push(category);
		c.categories = cc;
		setCurExpense(c);
	};

	const closeModal = () => {
		setShowModal(false);
		cats.current = [...categories];
		setCurExpense({ ...expense });
	};

	const submitExpense = async (e: React.FormEvent<HTMLFormElement>, total: number) => {
		e.preventDefault();

		setSubmitting(true);
		setShowToast('success');

		const c = { ...curExpense };
		c.total = total;

		console.log(c);

		try {
			const { data, status } = await axios.post('expenses/createExpense', c);
			console.log(status);
			console.log(data);

			cats.current = [...categories];
			const recEx = [...recentExpenses];
			recEx.push(c);
			setRecentExpenses(recEx);
			setShowToast('');
			setCurExpense({ ...expense });
			setSubmitting(false);
		} catch (err) {
			console.log(err);
			console.log(err.message);
		}
	};

	const noshow = () => {
		setShowToast('');
	};

	const setExpenses = (items: MoneyItem[]) => {
		setRecentExpenses(items);
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
				updateCategoryAmt={updateCategoryAmt}
				submit={submitExpense}
				showModal={showModal}
				closeModal={closeModal}
				removeCategories={removeCategories}
				title='expense'
			/>
			<RecentExpenses updateRecentItems={setExpenses} items={recentExpenses} />
		</div>
	);
};

export default Expenses;
