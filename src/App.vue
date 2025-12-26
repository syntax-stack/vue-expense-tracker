<script setup lang="ts">
import Header from '@/components/Header.vue';
import Balance from '@/components/Balance.vue';
import IncomeExpenses from '@/components/IncomeExpenses.vue';
import TransactionList from '@/components/TransactionList.vue';
import AddTransaction from '@/components/AddTransaction.vue';
import { ref, computed, onMounted, type Ref } from 'vue';
import type { NewTransactionData, Transaction } from './types';

import { useToast } from 'vue-toastification';
const toast = useToast();
const currency: Ref<string> = ref(localStorage.getItem('currency') || 'USD');

const transactions: Ref<Transaction[]> = ref([
    {
        id: 1,
        text: 'Example Invoice',
        amount: 30000,
        type: 'income',
    },
]);

onMounted(() => {
    const savedTransactions = localStorage.getItem('transactions');

    if (savedTransactions) {
        transactions.value = JSON.parse(savedTransactions);
    }
});

// Get total
const total = computed(() => {
    return transactions.value.reduce((accumulator, transaction) => {
        return transaction.type === 'expense'
            ? accumulator - transaction.amount
            : accumulator + transaction.amount;
    }, 0);
});

// Get income
const income = computed(() => {
    return transactions.value
        .filter((t) => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);
});

// Get expenses
const expenses = computed(() => {
    return transactions.value
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
});

// Add transaction to transactions
const handleTransactionSubmitted = (data: NewTransactionData) => {
    const newTransaction: Transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: data.text,
        amount: data.amount,
        type: data.type,
    };
    transactions.value.push(newTransaction);
    saveTransactionsToLocalStorage();
    toast.success('Transaction added');
};

const handleTransactionDeleted = (id: number) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
    saveTransactionsToLocalStorage();
    toast.success('Transaction deleted');
};

const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
};

const saveCurrencyToLocalStorage = () => {
    localStorage.setItem('currency', currency.value);
};
</script>

<template>
    <Header />

    <div class="container">
        <Balance :total="total" :currency="currency" />
        <IncomeExpenses :income="income" :expenses="expenses" :currency="currency" />
        <TransactionList
            :transactions="transactions"
            :currency="currency"
            @transaction-deleted="handleTransactionDeleted"
        />
        <AddTransaction @transaction-submitted="handleTransactionSubmitted" />
    </div>
</template>
