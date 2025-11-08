<script setup lang="ts">
import { ref } from 'vue';
import { coins } from '../scripts/coins';
import TipHeader from './TipHeader.vue';
import TipSummary from './TipSummary.vue';
import TipCalculatorForm from './TipCalculatorForm.vue';

const form = ref({
  selectedCoin: coins[0],
  accountValue: 0,
  tip: 10,
  people: 2
});

const isMobile = ref(window.innerWidth <= 768);
const showForm = ref(true);
const showSummary = ref(true);
if (isMobile.value) showSummary.value = false;

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
      v-model:form="form"
      @update:showSummary="updateViewWhenMobile($event)" />
    <TipSummary 
      v-show="showSummary"
      :isMobile="isMobile"
      :form="form" 
      @update:showSummary="updateViewWhenMobile($event)"/>
  </main>
</template>
