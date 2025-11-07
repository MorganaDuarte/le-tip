<script setup lang="ts">
import { ref } from 'vue';
import { coins } from '../scripts/coins';
import HeaderSection from './HeaderSection.vue';
import TipSummary from './TipSummary.vue';
import TipCalculatorForm from './TipCalculatorForm.vue';

const selectedCoin = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);

</script>

<template>
  <HeaderSection />

  <main class="main-content">
    <TipCalculatorForm @update:selectedCoin="selectedCoin = $event" @update:accountValue="accountValue = $event" @update:tip="tip = $event" @update:people="people = $event" />
    <TipSummary :selectedCoin="selectedCoin" :accountValue="accountValue" :tip="tip" :people="people" />
  </main>
</template>
