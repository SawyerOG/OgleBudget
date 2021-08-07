import React from 'react';
import Modal from './Modal';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { MoneyItem, MoneyType } from '../../containers/interfaces';

import DP from '../Datepicker/DatePicker';
import { DateTime } from 'luxon';

interface Props {
    showModal: boolean;
    closeModal: () => void;
    submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    categories?: string[];
    removeCategories: (_: any) => void;
    updateItem: (type: MoneyType, e: string | Date) => void;
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
}) => {
    return (
        <Modal show={showModal} title={`Add ${title}`} close={closeModal}>
            <Form onSubmit={submit}>
                <DP
                    selectedDate={item.date.toJSDate()}
                    setDate={(date: Date) => updateItem('date', date)}
                    label={`${title.toLowerCase()}`}
                />
                {showModal && (
                    <select
                        aria-label='select category'
                        className='form-select form-select-lg my-3'
                        onChange={(e) => updateItem('category', e.target.value)}
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
                            <li key={i} className='d-flex justify-content-between px-3'>
                                <p>{i}</p>
                                <p onClick={() => removeCategories(i)}>X</p>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <Form.Control
                    size='lg'
                    type='text'
                    placeholder={`${title.toLowerCase()} note`}
                    value={item.note}
                    onChange={(e) => updateItem('note', e.target.value)}
                />
                <InputGroup className='my-3'>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        aria-label='Amount'
                        type='number'
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateItem('amount', e.target.value.toString())}
                        value={item.amount || ''}
                        placeholder='0.00'
                        onBlur={(e) =>
                            !e.target.value.includes('.') && e.target.value.length > 0
                                ? updateItem('amount', e.target.value.toString() + '.00')
                                : null
                        }
                    />
                </InputGroup>
                <div className='text-center'>
                    <Button
                        variant='outline-success'
                        type='submit'
                        className='w-50'
                        style={{ height: '50px', backgroundColor: '#fff' }}
                        //@ts-ignore
                        disabled={(item.categories && item.categories.length === 0) || !item.amount}
                    >
                        {submitting ? <Spinner animation='border' variant='success' /> : 'submit expense'}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddModal;
