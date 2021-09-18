import React, { useState, createContext, useEffect } from 'react';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | '';

export const AlertContext = createContext({
    showAlert: (message: string, variant: Variant) => {},
    hideAlert: () => {},
    message: '',
    variant: '',
});

const AlertContextProvider: React.FC = ({ children }) => {
    const [show, setShow] = useState({ message: '', variant: '' });

    const showAlert = (message: string, variant: Variant) => {
        console.log(message);

        setShow({ message: message, variant: variant });
    };

    const hideAlert = () => {
        setShow({ message: '', variant: '' });
    };

    useEffect(() => {
        setTimeout(() => {
            if (show.message !== '') {
                setShow({ message: '', variant: '' });
            }
        }, 1750);
    }, [show.message]);

    return (
        <AlertContext.Provider
            value={{
                showAlert: showAlert,
                hideAlert: hideAlert,
                message: show.message,
                variant: show.variant,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContextProvider;
