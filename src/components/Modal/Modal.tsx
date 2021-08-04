import React from 'react';
import './Modal.css';

interface Props {
	show: boolean;
	title: string;
	close: () => void;
}

const Modal: React.FC<Props> = ({ show, title, children, close }) => {
	return (
		<div className={`Modal-Cont ${show ? 'ShowModal' : 'NoShowModal'}`}>
			<div className='d-flex justify-content-between'>
				<h6>{title}</h6>
				<h6 onClick={close}>close</h6>
			</div>
			<div className='mt-5'>{children}</div>
		</div>
	);
};

export default Modal;
