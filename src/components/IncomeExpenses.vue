<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    income: number,
    expenses: number,
    currency: string,
}>();

const format = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: props.currency,
    }).format(value / 100);
};

const formattedIncome = computed(() => format(props.income));
const formattedExpenses = computed(() => format(Math.abs(props.expenses)));
</script>

<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p id="money-plus" class="money plus">+{{ formattedIncome }}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p id="money-minus" class="money minus">-{{ formattedExpenses }}</p>
        </div>
    </div>
</template>
