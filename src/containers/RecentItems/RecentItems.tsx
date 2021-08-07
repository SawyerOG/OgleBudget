import React, { useState, useEffect } from 'react';
import TripleSpinners from '../../components/Spinners/TripleSpinner';

import { MoneyItem } from '../interfaces';

import { DateTime } from 'luxon';

const someItems: MoneyItem[] = [
    {
        amount: '112.89',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '125.99', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '112.89',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '125.49', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '112.11',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '125.99', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '114.89',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '128.49', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '167.11',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '185.99', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    { amount: '125.49', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '112.11',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '125.99', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '114.89',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '128.49', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
    {
        amount: '167.11',
        categories: ['Grocery', 'Alcohol'],
        date: DateTime.now(),
        note: 'This is a fine note',
    },
    { amount: '185.99', categories: ['Home Dev'], date: DateTime.now(), note: 'Paint and rollers' },
];

const RecentItems = () => {
    const [items, setItems] = useState<MoneyItem[]>([]);

    useEffect(() => {
        if (items.length === 0) {
            setTimeout(() => {
                setItems([...someItems]);
            }, 2000);
        }
    }, [items]);

    return (
        <div>
            {items.length === 0 ? (
                <TripleSpinners />
            ) : (
                <ul
                    className='mx-auto border-box'
                    style={{ maxHeight: 'calc(100vh - 100px)', width: '98%', overflowY: 'auto' }}
                >
                    {items.map((i) => (
                        <li key={i.amount} className='border border-success rounded fs-6 my-1 shadow-sm'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col text-start'>
                                        <p>{i.date.toLocaleString()}</p>
                                    </div>
                                    <div className='col text-end'>
                                        <p>{i.amount}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <p>{i.note}</p>
                                </div>
                                <div className='d-flex'>
                                    {i.categories.map((i) => (
                                        <li key={i} className='mx-1 fs-6 text-info'>
                                            {i}
                                        </li>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentItems;
