import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import { ReactComponent as Trash } from '../../components/UI/icons/trash.svg';

import TripleSpinners from '../../components/Spinners/TripleSpinner';

import { IncomingExpense, Expense } from './Expenses';

interface Props {
    pageType: 'expense' | 'income';
    items: IncomingExpense[] | null;
    deleteExpense: (ID: number) => Promise<void>;
}

const RecentItems: React.FC<Props> = ({ items, deleteExpense }) => {
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
                            eventKey={i.groupID + '-' + idx}
                            key={i.groupID}
                            className='border border-success rounded fs-6 my-1 p-0 shadow-sm bg-none'
                        >
                            <Accordion.Header className='row align-middle mx-1'>
                                <div className='col text-start'>
                                    <p>{i.date}</p>
                                </div>
                                <div className='col text-center'>
                                    <p>{i.total}</p>
                                </div>
                                <div className='col txt-end'>
                                    {i.expenseTypes.map((ii: string, idx: number) => (
                                        <p key={i + ii + idx}>{ii}</p>
                                    ))}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className='p-0 fs-5'>
                                <div className='d-flex justify-content-between align-items-center px-3 mt-1 text-info'>
                                    <table className='w-50'>
                                        <tbody>
                                            {i.expenses.map((ii: Expense) => (
                                                <tr key={ii.type} className='mx-1 fs-6'>
                                                    <td className='text-info text-start'>{ii.type}</td>
                                                    <td className=' text-end'>{ii.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p>Tax: {i.tax}</p>
                                    <Trash style={{ fill: '#e85c5c' }} onClick={() => deleteExpense(i.groupID)} />
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

export default RecentItems;
