<script setup lang="ts">
import type { NewTransactionData } from '@/types';
import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

const text: Ref<string> = ref('');
const amount: Ref<string> = ref('');

const emit = defineEmits<{
    (e: 'transactionSubmitted', data: NewTransactionData): void
}>();

const toast = useToast();

const onSubmit = () => {
    if (!text.value || !amount.value) {
        toast.error('Both fields must be filled');
        return;
    }

    if (isNaN(parseFloat(amount.value))) {
        toast.error('Amount must be a number');
        return;
    }

    const transactionData: NewTransactionData = {
        text: text.value,
        amount: Math.abs(parseFloat(amount.value) * 100),
        type: parseFloat(amount.value) >= 0 ? 'income' : 'expense'
    };

    emit('transactionSubmitted', transactionData);

    text.value = '';
    amount.value = '';
};
</script>

<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit" autocomplete="off">
        <div class="form-control">
            <label for="text">Transaction name</label>
            <input type="text" id="text" v-model="text" placeholder="Enter transaction name..." />
        </div>
        <div class="form-control">
            <label for="amount"
                >Amount <br />
                (negative - expense, positive - income)</label
            >
            <input type="text" id="amount" v-model="amount" placeholder="Enter transaction amount..." />
        </div>
        <button class="btn">Add Transaction</button>
    </form>
</template>
