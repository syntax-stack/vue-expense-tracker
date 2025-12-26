export interface Transaction {
    id: number;
    text: string;
    amount: number;
    type: 'income' | 'expense';
}

export type NewTransactionData = Omit<Transaction, 'id'>;