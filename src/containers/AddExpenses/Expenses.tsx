import React, { useState, useRef } from 'react';
import AddItemButton from '../../components/AddItemButton';
import CustomToast from '../../components/Alert/Alert';
import AddModal from '../../components/AddModal';

import RecentExpenses from './RecentExpenses';

export interface Expense {
	categories: string[];
	date: Date;
	note: string;
	amount: string;
}

export type Type = 'category' | 'date' | 'note' | 'amount';

const expense = {
	categories: [],
	date: new Date(),
	note: '',
	amount: '',
};

const categories = ['Grocery', 'Alcohol', 'House Dev', 'Hobbies', 'Mortgage'];

const Expenses = () => {
	const [showModal, setShowModal] = useState(false);
	const [curExpense, setCurExpense] = useState<Expense>({ ...expense });
	const [submitting, setSubmitting] = useState(false);
	const [showToast, setShowToast] = useState<'success' | 'warning' | ''>('');
	// const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);

	const cats = useRef([...categories]);

	const updateExpense = (type: Type, value: any) => {
		const c: Expense = { ...curExpense };

		//@ts-ignore
		if (type === 'category') {
			const cc = [...c.categories];
			cc.push(value);
			c.categories = cc;
			cats.current = cats.current.filter((i) => i !== value);
		} else {
			// @ts-ignore
			c[type] = value;
		}
		setCurExpense(c);
	};

	const removeCategories = (category: Type) => {
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
		<div className='fs-4'>
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
				isExpense={true}
			/>
			<p className='fs-5'>
				<u>Recent Expenses</u>
			</p>
			<RecentExpenses />
		</div>
	);
};

export default Expenses;
