import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';

import { AlertContext } from './AlertContext';

const CustomAlert: React.FC = () => {
    const alert = useContext(AlertContext);

    return (
        <Alert
            className={`position-absolute w-100 text-center`}
            style={{ top: '15px', zIndex: 1080 }}
            variant={alert.variant}
            onClose={() => alert.hideAlert()}
            dismissible
            show={alert.message ? true : false}
            transition
        >
            {alert.message}
        </Alert>
    );
};

export default CustomAlert;
