import React, { useState, useEffect, useRef } from 'react';
import './EditCats.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

interface Category {
    type: string;
    ID: number;
    [key: number]: string;
}

interface Cats {
    expense: Category[];
    income: Category[];
    [key: string]: Category[];
}

interface CatsRef {
    expense: {
        [key: number]: string;
    };
    income: {
        [key: number]: string;
    };
    [key: string]: any;
}

const EditCats: React.FC = () => {
    const [selected, setSelected] = useState('expense');
    const [cats, setCats] = useState<Cats>({ expense: [], income: [] });
    const [activeForm, setActiveForm] = useState({ ID: 0, value: '' });

    const catsRef = useRef<CatsRef>({ expense: {}, income: {} });

    useEffect(() => {
        if (
            (selected === 'expense' && cats.expense && cats.expense.length === 0) ||
            (selected === 'income' && cats.income && cats.income.length === 0)
        ) {
            console.log(cats[selected]);

            axios.get(`/updateCats/getCats?type=${selected}`).then((res) => {
                console.log('running');

                const obj = {} as any;

                for (let i = 0; i < res.data.cats.length; i++) {
                    obj[res.data.cats[i].ID] = res.data.cats[i].type;
                }

                catsRef.current[selected] = obj;
                console.log(catsRef.current);

                const c = { ...cats };
                c[selected] = res.data.cats;
                setCats(c);
            });
        }
    }, [selected, cats]);

    const updateCat = (value: string) => {
        console.log(catsRef.current);

        const c = { ...activeForm };
        c.value = value;
        setActiveForm(c);
    };

    return (
        <div className='container-fluid'>
            <div className='border-info PillBox row text-center mt-2'>
                <p
                    className={`d-inline col Left ${selected === 'expense' ? 'Filled' : ''}`}
                    onClick={() => setSelected('expense')}
                >
                    Expenses
                </p>
                <p
                    className={`d-inline col Right ${selected === 'income' ? 'Filled' : ''}`}
                    onClick={() => setSelected('income')}
                >
                    Incomes
                </p>
            </div>
            <div>
                {cats[selected] &&
                    cats[selected].length > 0 &&
                    cats[selected].map((i) => (
                        <Form key={i.ID}>
                            <Row>
                                <Col xs={9}>
                                    <Form.Control
                                        placeholder={i.type}
                                        value={activeForm.ID === i.ID ? activeForm.value : ''}
                                        onFocus={() => setActiveForm({ ID: i.ID, value: i.type })}
                                        onChange={(e) => updateCat(e.target.value)}
                                        onBlur={() => setActiveForm({ ID: 0, value: '' })}
                                    />
                                </Col>
                                <Col>
                                    {activeForm.ID === i.ID &&
                                        catsRef.current[selected][activeForm.ID] !== activeForm.value && (
                                            <Button variant='outline-success'>save</Button>
                                        )}
                                </Col>
                            </Row>
                        </Form>
                    ))}
            </div>
        </div>
    );
};

export default EditCats;
