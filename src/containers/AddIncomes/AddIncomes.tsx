import React from 'react';
import AddItemButton from '../../components/AddItemButton';

const AddIncomes = () => {
	return (
		<div className=''>
			<AddItemButton title='Add Income' onClick={() => console.log('new income')} />
		</div>
	);
};

export default AddIncomes;
