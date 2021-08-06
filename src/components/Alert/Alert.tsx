import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

interface Props {
	message: string;
	variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | '';
	showTime: number;
	noshow: () => void;
}

let timer: NodeJS.Timer;
const CustomAlert: React.FC<Props> = ({ message, variant, showTime, noshow }) => {
	useEffect(() => {
		if (message) {
			if (!timer) {
				console.log('set timer');

				timer = setTimeout(() => {
					noshow();
				}, showTime);
			}
		}
	}, [message, noshow, variant, showTime]);

	return (
		<Alert
			className={`position-absolute w-100 ${message ? '' : 'd-none'}`}
			style={{ top: '15px', zIndex: 100 }}
			variant={variant}
		>
			{message}
		</Alert>
	);
};

export default CustomAlert;
