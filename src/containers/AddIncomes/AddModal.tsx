import React from 'react';

import Modal from '../../components/Modal/Modal';
import DP from '../../components/Datepicker/DatePicker';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { IncomingIncome } from './Incomes';
import Spinner from 'react-bootstrap/esm/Spinner';

interface Props {
    title: string;
    curIncome: IncomingIncome;
    updateCurIncome: (type: string, value: any) => void;
    submitIncome: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    showModal: boolean;
    closeModal: () => void;
    submitting: boolean;
    types: string[];
}

const AddIncome: React.FC<Props> = ({
    title,
    curIncome,
    updateCurIncome,
    submitIncome,
    showModal,
    closeModal,
    submitting,
    types,
}) => {
    return (
        <Modal show={showModal} title={`Add ${title}`} close={closeModal}>
            <Form onSubmit={(e) => submitIncome(e)} className='text-center'>
                <DP
                    selectedDate={curIncome.date}
                    setDate={(date: Date) => updateCurIncome('date', date)}
                    label={`${title}`}
                />
                {showModal && (
                    <select
                        aria-label='select category'
                        className='form-select form-select-lg my-3'
                        onChange={(e) => updateCurIncome('type', e.target.value)}
                    >
                        <option disabled>select category</option>
                        {types &&
                            types.length > 0 &&
                            types.map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                    </select>
                )}
                <InputGroup className='mb-2'>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        aria-label='Amount'
                        type='number'
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateCurIncome('income', parseFloat(e.target.value))}
                        value={curIncome.income} //selected === i.type ? amt :
                        placeholder='0.00'
                    />
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>tax</InputGroup.Text>
                    <Form.Control
                        aria-label='Tax'
                        type='number'
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateCurIncome('tax', parseFloat(e.target.value))}
                        value={curIncome.tax}
                        placeholder='0.00'
                    />
                </InputGroup>
                <Form.Control
                    size='lg'
                    type='text'
                    placeholder={`${title} note`}
                    value={curIncome.note.toString()}
                    onChange={(e) => updateCurIncome('note', e.target.value)}
                />
                <p className='text-info text-start fs-6'>Total: {!isNaN(curIncome.total) ? curIncome.total : '--'}</p>
                <Button
                    variant='outline-success'
                    type='submit'
                    className='w-50 mt-5'
                    style={{ height: '50px', backgroundColor: '#fff' }}
                    disabled={
                        !curIncome.date ||
                        !curIncome.income ||
                        !curIncome.type ||
                        curIncome.total === 0 ||
                        isNaN(curIncome.total)
                    }
                >
                    {submitting ? <Spinner animation='border' variant='success' /> : `submit ${title}`}
                </Button>
            </Form>
        </Modal>
    );
};

export default AddIncome;
