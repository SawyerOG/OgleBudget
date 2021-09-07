import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import TripleSpinners from '../../components/Spinners/TripleSpinner';

import { ExpenseObj, Expense } from '../AddExpenses/Expenses';

interface Props {
    pageType: 'expense' | 'income';
    items: ExpenseObj | null;
}

const RecentItems: React.FC<Props> = ({ items, pageType }) => {
    return (
        <div>
            {items === null ? (
                <TripleSpinners />
            ) : (
                <Accordion
                    flush
                    className='mx-auto bg-none box-sizing'
                    style={{ maxHeight: 'calc(100vh - 100px)', width: '96%', overflowY: 'auto', outline: 'none' }}
                >
                    {Object.keys(items).map((i, idx) => (
                        <Accordion.Item
                            eventKey={i}
                            key={i}
                            className='border border-success rounded fs-6 my-1 p-0 shadow-sm bg-none'
                        >
                            <Accordion.Header className='row align-middle mx-1'>
                                <div className='col text-start'>
                                    <p>{items[i].date}</p>
                                </div>
                                <div className='col text-center'>
                                    <p>{items[i].total}</p>
                                </div>
                                <div className='col txt-end'>
                                    {items[i].expenseTypes.map((ii: string, idx: number) => (
                                        <p key={i + ii + idx}>{ii}</p>
                                    ))}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className='p-0 fs-5'>
                                <div className='d-flex justify-content-between align-items-center px-3 mt-1 text-info'>
                                    <table className='w-50'>
                                        <tbody>
                                            {items[i].expenses.map((ii: Expense) => (
                                                <tr key={ii.type} className='mx-1 fs-6'>
                                                    <td className='text-info text-start'>{ii.type}</td>
                                                    <td className=' text-end'>{ii.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p>Tax: {items[i].tax}</p>
                                </div>
                                <p className='ps-2'>{items[i].note}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default RecentItems;
