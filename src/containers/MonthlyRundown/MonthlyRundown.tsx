import React, { useState, useEffect } from 'react';

import axios from 'axios';

interface Total {
    type: string;
    amount: string;
}
interface Totals {
    totals: Total[];
    tax: string;
}

const MonthlyRundown = () => {
    const [totals, setTotals] = useState<Totals>({ totals: [], tax: '' });

    useEffect(() => {
        axios.get('/rundown/monthlyRundown').then((res) => {
            const { data } = res;

            setTotals(data);
        });
    }, []);

    return (
        <div className='container-fluid'>
            <p>
                <strong>
                    <u>Rundown</u>
                </strong>
            </p>
            {totals.totals.length > 0 &&
                totals.totals.map((i) => (
                    <p>
                        {i.type}: {i.amount}
                    </p>
                ))}
            <p>{totals.tax && totals.tax}</p>
        </div>
    );
};

export default MonthlyRundown;
