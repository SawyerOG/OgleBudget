import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import { DateTime } from 'luxon';

import AddItemButton from '../../components/AddItemButton';
import AddModal from './AddModal';
import RecentIncome from './RecentIncomes';

export interface IncomingIncome {
    ID: number;
    income: number;
    tax: number;
    total: number;
    type: string;
    typeID: number;
    note: string;
    date: Date;
}

interface TypeIDs {
    type: number;
    [key: string]: number;
}

const incomeObj = {
    ID: Math.random() * Math.random(),
    income: 0,
    tax: 0,
    total: 0,
    type: 'Sawyer Pay',
    typeID: 1,
    note: '',
    date: new Date(),
};

const Incomes = () => {
    const [showModal, setShowModal] = useState(false);
    const [recentIncomes, setRecentIncomes] = useState<IncomingIncome[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const [curIncome, setCurIncome] = useState({ ...incomeObj });

    const incomeTypes = useRef({ types: [] as string[], typeIDs: {} as TypeIDs });

    useEffect(() => {
        axios.get('/incomes/getRecentIncomes').then((res) => {
            const { recentIncomes, types, typeIDs } = res.data;

            incomeTypes.current.types = types;
            incomeTypes.current.typeIDs = typeIDs;
            setRecentIncomes(recentIncomes);
        });
    }, []);

    const updateCurIncome = (type: string, value: any) => {
        const c = { ...curIncome };

        switch (type) {
            case 'income':
                c.income = parseFloat(value.toFixed(2));
                c.total = c.tax + c.income;
                c.total = parseFloat(c.total.toFixed(2));
                setCurIncome(c);
                break;
            case 'tax':
                c.tax = parseFloat(value.toFixed(2));
                c.total = c.income + c.tax;
                c.total = parseFloat(c.total.toFixed(2));
                setCurIncome(c);
                break;
            default:
                //@ts-ignore
                c[type] = value;
                setCurIncome(c);
                break;
        }
    };

    const submitIncome = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const inc = { ...curIncome };
            inc.typeID = incomeTypes.current.typeIDs[inc.type];
            const { status, data } = await axios.post('/incomes/createIncome', curIncome);

            if (status === 201) {
                const c = [...recentIncomes];

                curIncome.ID = data.ID;
                //@ts-ignore
                curIncome.date = DateTime.fromJSDate(curIncome.date).toLocaleString(DateTime.DATE_SHORT);
                c.push(curIncome);

                setCurIncome({ ...incomeObj });
                setRecentIncomes(c);
                setSubmitting(false);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='fs-5'>
            <AddModal
                title='Income'
                curIncome={curIncome}
                updateCurIncome={updateCurIncome}
                submitIncome={submitIncome}
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                submitting={submitting}
                types={incomeTypes.current.types}
            />
            <AddItemButton title='Income' onClick={() => setShowModal(true)} />
            <RecentIncome items={recentIncomes} />
        </div>
    );
};

export default Incomes;
