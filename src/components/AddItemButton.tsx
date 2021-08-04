import React from 'react';
import Button from 'react-bootstrap/Button';

import { ReactComponent as Add } from '../components/UI/icons/add.svg';

interface Props {
	onClick: () => void;
	title: string;
}

const AddItemButton: React.FC<Props> = ({ title, onClick }) => {
	return (
		<div className='px-2'>
			<Button variant='secondary' className='fs-4 w-100 mt-1' onClick={onClick}>
				<Add style={{ fill: '#fff', marginBottom: '5px' }} />
				{title}
			</Button>
		</div>
	);
};

export default AddItemButton;
