<script setup lang="ts">
import type { Transaction } from '@/App.vue';

const props = defineProps<{
    currency: string,
    transactions: Transaction[]
}>();

const formatAmount = (transaction: Transaction) => {
    const sign = transaction.type === 'income' ? '+' : '-';
    const value = (transaction.amount / 100).toFixed(2);
    return `${sign}${value}`;
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
            {{ transaction.text }} <span>{{ currency }} {{ formatAmount(transaction) }}</span
            ><button class="delete-btn">X</button>
        </li>
    </ul>
</template>
