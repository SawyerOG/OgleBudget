import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import TripleSpinners from '../../components/Spinners/TripleSpinner';

import { MoneyItem } from '../interfaces';

import { DateTime } from 'luxon';

interface Props {
    updateRecentItems: (items: MoneyItem[]) => void;
    items: MoneyItem[];
}

const someItems: MoneyItem[] = [
    {
        tax: '11.89',
        categories: [
            { type: 'Grocery', amount: '56.75' },
            { type: 'Alcohol', amount: '56.76' },
        ],
        date: new Date(),
        note: 'This is a fine note',
        total: 109.99,
    },
    {
        tax: '15.99',
        categories: [{ type: 'Home Dev', amount: '56.77' }],
        date: new Date(),
        note: 'Paint and rollers',
        total: 109.99,
    },
    {
        tax: '6.89',
        categories: [
            { type: 'Grocery', amount: '56.78' },
            { type: 'Alcohol', amount: '56.79' },
        ],
        date: new Date(),
        note: 'This is a fine note',
        total: 109.99,
    },
];

const RecentItems: React.FC<Props> = ({ items, updateRecentItems }) => {
    useEffect(() => {
        if (items.length === 0) {
            setTimeout(() => {
                updateRecentItems([...someItems]);
            }, 2000);
        }
    }, [items]);

    return (
        <div>
            {items.length === 0 ? (
                <TripleSpinners />
            ) : (
                <Accordion
                    flush
                    className='mx-auto bg-none box-sizing'
                    style={{ maxHeight: 'calc(100vh - 100px)', width: '96%', overflowY: 'auto', outline: 'none' }}
                >
                    {items.map((i, idx) => (
                        <Accordion.Item
                            eventKey={idx.toString()}
                            key={i.tax}
                            className='border border-success rounded fs-6 my-1 p-0 shadow-sm bg-none'
                        >
                            <Accordion.Header className='row align-middle mx-1'>
                                <div className='col text-start'>
                                    <p>{DateTime.fromJSDate(i.date).toLocaleString()}</p>
                                </div>
                                <div className='col text-center'>
                                    <p>{i.total}</p>
                                </div>
                                <div className='col text-end'>
                                    {i.categories.map((i) => (
                                        <p key={i.type}>{i.type}</p>
                                    ))}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className='p-0 fs-5'>
                                <p className='ps-2'>{i.note}</p>
                                <div className='d-flex justify-content-between px-3 text-infotitan'>
                                    <table className='w-50'>
                                        <tbody>
                                            {i.categories.map((i) => (
                                                <tr key={i.amount} className='mx-1 fs-6'>
                                                    <td className='text-info text-start'>{i.type}</td>
                                                    <td className=' text-end'>{i.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p>Tax: {i.tax}</p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default RecentItems;
