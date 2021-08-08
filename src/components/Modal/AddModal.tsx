import React, { useState, useEffect } from 'react';
import Modal from './Modal';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { MoneyItem, MoneyType } from '../../containers/interfaces';

import DP from '../Datepicker/DatePicker';
// import { DateTime } from 'luxon';

interface Props {
    showModal: boolean;
    closeModal: () => void;
    submit: (e: React.FormEvent<HTMLFormElement>, total: number) => Promise<void>;
    categories?: string[];
    removeCategories: (_: any) => void;
    updateItem: (type: MoneyType, e: string | Date, category: string | null) => void;
    updateCategoryAmt: (type: string, amount: string) => void;
    item: MoneyItem;
    submitting: boolean;
    title: string;
}

const AddModal: React.FC<Props> = ({
    showModal,
    closeModal,
    submit,
    categories,
    updateItem,
    item,
    submitting,
    removeCategories,
    title,
    updateCategoryAmt,
}) => {
    // const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    const [selected, setSelected] = useState('');
    const [amt, setAmt] = useState('');

    useEffect(() => {
        let newTotal = 0;
        item.categories.forEach((i) => console.log(i.amount));
        item.categories.forEach((i) => (newTotal += i.amount ? parseFloat(i.amount) : 0));
        newTotal += item.tax ? parseFloat(item.tax) : 0;

        setTotal(parseFloat(newTotal.toFixed(2)));
    }, [item.categories, item.tax]);

    return (
        <Modal show={showModal} title={`Add ${title}`} close={closeModal}>
            <Form onSubmit={(e) => submit(e, total)}>
                <DP
                    selectedDate={item.date}
                    setDate={(date: Date) => updateItem('date', date, null)}
                    label={`${title}`}
                />
                {showModal && (
                    <select
                        aria-label='select category'
                        className='form-select form-select-lg my-3'
                        onChange={(e) => updateItem('category', e.target.value, null)}
                    >
                        <option>select category</option>
                        {categories &&
                            categories.map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                    </select>
                )}
                {item.categories.length ? (
                    <ul className='list-unstyled'>
                        {item.categories.map((i) => (
                            <li key={i.amount} className='d-flex justify-content-between align-items-center px-3'>
                                <div className='d-flex flex-column my-0'>
                                    <p>{i.type}</p>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control
                                            aria-label='Amount'
                                            type='number'
                                            onFocus={(e) => {
                                                setSelected(i.type);
                                                setAmt(i.amount);
                                            }}
                                            onChange={(e) => setAmt(e.target.value)}
                                            value={selected === i.type ? amt : i.amount}
                                            placeholder='0.00'
                                            onBlur={(e) => {
                                                updateCategoryAmt(i.type, amt.includes('.') ? amt : amt + '.00');
                                                setAmt('');
                                                setSelected('');
                                            }}
                                        />
                                    </InputGroup>
                                </div>
                                <p onClick={() => removeCategories(i.type)}>X</p>
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
                        onChange={(e) => updateItem('tax', e.target.value, null)}
                        value={item.tax}
                        placeholder='0.00'
                    />
                </InputGroup>
                <Form.Control
                    size='lg'
                    type='text'
                    placeholder={`${title} note`}
                    value={item.note}
                    onChange={(e) => updateItem('note', e.target.value, null)}
                />
                <p className='text-info fs-6'>Total: {total}</p>
                <div className='text-center'>
                    <Button
                        variant='outline-success'
                        type='submit'
                        className='w-50'
                        style={{ height: '50px', backgroundColor: '#fff' }}
                        //@ts-ignore
                        disabled={item.categories && item.categories.length === 0}
                    >
                        {submitting ? <Spinner animation='border' variant='success' /> : `submit ${title}`}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddModal;
