import React, { useState } from 'react';
import AddItemButton from '../../components/AddItemButton';
import Modal from '../../components/Modal/Modal';

import DP from '../../components/Datepicker/DatePicker';
import AddModal from '../../components/AddModal';

export interface Income {
	date: Date;
	note: string;
	amount: string;
}

const AddIncomes = () => {
	const [showModal, setShowModal] = useState(false);
	const [curIncome, setCurIncome] = useState({});

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className=''>
			<AddItemButton title='Add Income' onClick={() => setShowModal(true)} />
			<AddModal
				item={curIncome}
				submitting={submitting}
				updateItem={updateExpense}
				submit={submitExpense}
				showModal={showModal}
				closeModal={closeModal}
				removeCategories={removeCategories}
			></AddModal>
		</div>
	);
};

export default AddIncomes;
