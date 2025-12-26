<script setup lang="ts">
import Header from '@/components/Header.vue';
import Balance from '@/components/Balance.vue';
import IncomeExpenses from '@/components/IncomeExpenses.vue';
import TransactionList from '@/components/TransactionList.vue';
import AddTransaction from '@/components/AddTransaction.vue';
import { ref, type Ref } from 'vue';

const currency: Ref<string> = ref('USD');

export type Transaction = {
    id: number;
    text: string;
    amount: number; // Stored in cents (e.g., 100 = $1.00)
    type: 'income' | 'expense';
};

const transactions: Ref<Transaction[]> = ref([
    {
        id: 1,
        text: 'Flower',
        amount: 1999,
        type: 'expense',
    },
    {
        id: 2,
        text: 'Chocolate',
        amount: 1999,
        type: 'expense',
    },
    {
        id: 3,
        text: 'Salary',
        amount: 300000,
        type: 'income',
    },
]);
</script>

<template>
    <Header />

    <div class="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList :transactions="transactions" :currency="currency" />
        <AddTransaction />
    </div>
</template>
