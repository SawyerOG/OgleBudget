import React from 'react';
import Modal from '../../components/Modal/Modal';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { ExpenseTypes, IncomingExpense, Expense } from './Expenses';

import DP from '../../components/Datepicker/DatePicker';

interface Props {
    showModal: boolean;
    closeModal: () => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    categories: ExpenseTypes | null;
    removeCategory: (type: string) => void;
    updateNewExpense: (type: any, e: any, index?: number) => void;
    // updateCategoryAmt: (type: string, amount: string) => void;
    item: IncomingExpense;
    submitting: boolean;
    title: string;
}

const AddModal: React.FC<Props> = ({
    showModal,
    closeModal,
    submit,
    categories,
    updateNewExpense,
    item,
    submitting,
    removeCategory,
    title,
}) => {
    return (
        <Modal show={showModal} title={`Add ${title}`} close={closeModal}>
            <Form onSubmit={(e) => submit(e)} className='text-center'>
                <DP
                    selectedDate={item.date}
                    setDate={(date: Date) => updateNewExpense('date', date)}
                    label={`${title}`}
                />
                {showModal && (
                    <select
                        aria-label='select category'
                        className='form-select form-select-lg my-3'
                        onChange={(e) => updateNewExpense('category', e.target.value)}
                    >
                        <option>select category</option>
                        {categories &&
                            Object.keys(categories).map((i, idx) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                    </select>
                )}
                {item.expenses.length ? (
                    <ul className='list-unstyled'>
                        {item.expenses.map((i: Expense, idx: number) => (
                            <li key={i.type} className='d-flex justify-content-between align-items-center px-3'>
                                <div className='d-flex flex-column my-0'>
                                    <p>{i.type}</p>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control
                                            aria-label='Amount'
                                            type='number'
                                            onFocus={(e) => e.target.select()}
                                            onChange={(e) =>
                                                updateNewExpense('expense', parseFloat(e.target.value), idx)
                                            }
                                            value={i.amount} //selected === i.type ? amt :
                                            placeholder='0.00'
                                        />
                                    </InputGroup>
                                </div>
                                <p onClick={() => removeCategory(i.type)}>X</p>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <InputGroup className='mb-2'>
                    <InputGroup.Text>tax</InputGroup.Text>
                    <Form.Control
                        aria-label='Tax'
                        type='number'
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateNewExpense('tax', parseFloat(e.target.value))}
                        value={item.tax}
                        placeholder='0.00'
                    />
                </InputGroup>
                <Form.Control
                    size='lg'
                    type='text'
                    placeholder={`${title} note`}
                    value={item.note.toString()}
                    onChange={(e) => updateNewExpense('note', e.target.value)}
                />
                <p className='text-info text-start fs-6'>Total: {!isNaN(item.total) ? item.total : '--'}</p>
                <Button
                    variant='outline-success'
                    type='submit'
                    className='w-50 mt-5'
                    style={{ height: '50px', backgroundColor: '#fff' }}
                    disabled={item.expenses.length === 0 || item.total === 0 || isNaN(item.total)}
                >
                    {submitting ? <Spinner animation='border' variant='success' /> : `submit ${title}`}
                </Button>
            </Form>
        </Modal>
    );
};

export default AddModal;
