import { DateTime } from 'luxon';

export interface Category {
	type: string;
	amount: string;
}

export interface MoneyItem {
	date: Date;
	note: string;
	tax: string;
	total: number;
	categories: Category[];
}

export type MoneyType = 'category' | 'date' | 'note' | 'tax';
export type IncomeType = 'Work' | 'Rebate' | 'Coupon' | 'Sale';
