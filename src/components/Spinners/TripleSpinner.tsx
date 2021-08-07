import React from 'react';
import './Spinners.css';

import Spinner from 'react-bootstrap/Spinner';

const TripleSpinner = () => {
    return (
        <div className='SpinnerCont'>
            <Spinner animation='grow' variant='info' className='mx-auto' />
            <Spinner animation='grow' variant='info' className='mx-auto' />
            <Spinner animation='grow' variant='info' className='mx-auto' />
        </div>
    );
};

export default TripleSpinner;
