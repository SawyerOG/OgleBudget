import { DateTime } from 'luxon';

interface Category {
    type: string;
    amount: string;
}

export interface MoneyItem {
    date: DateTime;
    note: string;
    amount: string;
    categories: Category[];
}

export type MoneyType = 'category' | 'date' | 'note' | 'amount';
