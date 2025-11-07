<script setup lang="ts">
import { ref } from 'vue';
import { coins } from '../scripts/coins';
import TipHeader from './TipHeader.vue';
import TipSummary from './TipSummary.vue';
import TipCalculatorForm from './TipCalculatorForm.vue';

const selectedCoin = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);

const isMobile = ref(window.innerWidth <= 768);
const showForm = ref(true);
const showSummary = ref(true);
if (isMobile.value) {
  showSummary.value = false;
}

const updateViewWhenMobile = (value: boolean) => {
  showSummary.value = value;
  showForm.value = !value;
};
</script>

<template>
  <TipHeader />

  <main class="main-content">
    <TipCalculatorForm 
      v-show="showForm"
      :isMobile="isMobile"
      @update:selectedCoin="selectedCoin = $event" 
      @update:accountValue="accountValue = $event" 
      @update:tip="tip = $event" 
      @update:people="people = $event"
      @update:showSummary="updateViewWhenMobile($event)" />
    <TipSummary 
      v-show="showSummary"
      :isMobile="isMobile"
      :selectedCoin="selectedCoin" 
      :accountValue="accountValue" 
      :tip="tip" 
      :people="people" 
      @update:showSummary="updateViewWhenMobile($event)"/>
  </main>
</template>
