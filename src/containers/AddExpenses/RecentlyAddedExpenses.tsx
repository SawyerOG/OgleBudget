import React, { useState } from 'react';
import AddItemButton from '../../components/AddItemButton';
import CustomToast from '../../components/Alert/Alert';
import AddModal from '../../components/AddModal';

export interface Expense {
	category: string;
	date: Date;
	note: string;
	amount: number | undefined;
}

export type Type = 'category' | 'date' | 'note' | 'amount';

const expense = {
	category: '',
	date: new Date(),
	note: '',
	amount: undefined,
};

const categories = ['Grocery', 'Alcohol', 'House Dev', 'Hobbies', 'Mortgage'];

const RecentlyAddedExpenses = () => {
	const [showModal, setShowModal] = useState(false);
	const [curExpense, setCurExpense] = useState<Expense>({ ...expense });
	const [submitting, setSubmitting] = useState(false);
	const [showToast, setShowToast] = useState<'success' | 'warning' | ''>('');

	const updateExpense = (type: Type, value: any) => {
		setCurExpense((prev) => {
			const c: Expense = { ...prev };
			// @ts-ignore
			c[type] = value;
			return c;
		});
	};

	const closeModal = () => {
		setShowModal(false);
		setCurExpense({ ...expense });
	};

	const submitExpense = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSubmitting(true);
		setShowToast('success');

		console.log(curExpense);

		try {
			setTimeout(() => {
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
				categories={categories}
				item={curExpense}
				submitting={submitting}
				updateItem={updateExpense}
				submit={submitExpense}
				showModal={showModal}
				closeModal={closeModal}
			/>
			<p className='fs-5'>
				<u>Recent Expenses</u>
			</p>
		</div>
	);
};

export default RecentlyAddedExpenses;
