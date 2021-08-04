import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	label: string;
	selectedDate: Date;
	setDate: (e: Date) => void;
}

const DP: React.FC<Props> = ({ label, selectedDate, setDate }) => {
	return (
		<div className='mx-auto w-75'>
			<label className='fs-6 px-3'>{label} date</label>
			<DatePicker onChange={(e: Date) => setDate(e)} selected={selectedDate} className='text-center p-1 border-1' />
		</div>
	);
};

export default DP;
