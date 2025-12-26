<script setup lang="ts">
import type { Transaction } from '@/types';

const props = defineProps<{
    currency: string;
    transactions: Transaction[];
}>();

const emit = defineEmits<{
    (e: 'transactionDeleted', id: number): void
}>();

const formatDisplay = (transaction: Transaction) => {
    const amount = transaction.amount / 100;

    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: props.currency,
    }).format(amount);

    return transaction.type === 'income' ? `+${formatted}` : `-${formatted}`;
};

const deleteTransaction = (id: number) => {
    emit('transactionDeleted', id);
};

</script>

<template>
    <h4>History</h4>
    <ul id="list" class="list">
        <li
            v-for="transaction in props.transactions"
            :key="transaction.id"
            :class="transaction.type === 'income' ? 'plus' : 'minus'"
        >
            {{ transaction.text }} <span>{{ formatDisplay(transaction) }}</span
            ><button class="delete-btn" @click="deleteTransaction(transaction.id)">X</button>
        </li>
    </ul>
</template>
