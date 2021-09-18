import React from 'react';
import { ReactComponent as Trash } from '../../components/UI/icons/trash.svg';

import TripleSpinners from '../../components/Spinners/TripleSpinner';
import Accordion from 'react-bootstrap/Accordion';

import { IncomingIncome } from './Incomes';

interface Props {
    items: IncomingIncome[] | null;
}

const RecentIncome: React.FC<Props> = ({ items }) => {
    return (
        <>
            {items === null ? (
                <TripleSpinners />
            ) : (
                <Accordion
                    flush
                    className='mx-auto bg-none box-sizing'
                    style={{ maxHeight: 'calc(100vh - 100px)', width: '96%', overflowY: 'auto', outline: 'none' }}
                >
                    {items.map((i, idx) => (
                        <Accordion.Item
                            eventKey={i.ID + '-' + idx}
                            key={i.ID + '-1' + idx}
                            className='border border-success rounded fs-6 my-1 p-0 shadow-sm bg-none'
                        >
                            <Accordion.Header className='row align-middle mx-1'>
                                <p className='col text-start'>{i.date}</p>
                                <p className='col text-center'>{i.income}</p>
                                <p className='col txt-end'>{i.type}</p>
                            </Accordion.Header>
                            <Accordion.Body className='p-0 fs-5'>
                                <div className='d-flex justify-content-between align-items-center px-3 mt-1 text-info'>
                                    <p>Tax: {i.tax}</p>
                                    <Trash style={{ fill: '#e85c5c' }} onClick={() => console.log(i.ID)} />
                                </div>
                                <p className='ps-2'>{i.note}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </>
    );
};

export default RecentIncome;
