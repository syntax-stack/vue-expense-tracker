<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    total: number;
    currency: string;
}>();

const formattedBalance = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: props.currency,
    }).format(props.total / 100);
});
</script>

<template>
    <div class="container">
        <section>
            <h4>Your Balance</h4>
            <h1 id="balance">{{ formattedBalance }}</h1>
        </section>
        <section class="two">
            <p>Choose your currency</p>
            <p>GBP | USD | EUR | FK</p>
        </section>
    </div>
</template>

<style lang="css" scoped>
.container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

p {
    margin-top: 0;
    margin-bottom: 0;
}
</style>
