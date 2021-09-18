import React from 'react';
import { ReactComponent as Dollar } from '../components/UI/icons/dollar.svg';

interface Props {
    toggleDrawer: () => void;
}

const TopBar: React.FC<Props> = ({ toggleDrawer }) => {
    return (
        <div className='p-2 d-flex justify-content-between text-light bg-info'>
            <Dollar style={{ fill: '#fff' }} className='float-start' onClick={() => toggleDrawer()} />
            <p className='position-relative Name'>oglesby</p>
        </div>
    );
};

export default TopBar;
