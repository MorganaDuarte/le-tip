<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { coins } from '../scripts/coins';
import { BRL } from '../scripts/coins';
import TipHeader from './TipHeader.vue';
import TipSummary from './TipSummary.vue';
import TipCalculatorForm from './TipCalculatorForm.vue';
import TipLoading from './TipLoading.vue';
import Quotation from '../clients/QuotationClient';

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

const setActiveSectionWhenMobile = (value: boolean) => {
  showSummary.value = value;
  showForm.value = !value;
};

const quotations = ref({})
const isLoading = ref(true);
const messageError = ref('');

async function getQuotations() {
  try {
    const quotation = new Quotation(BRL.value);

    quotations.value = await quotation.getQuotationsFromApi();
  } catch (error) {
    console.error('Erro ao obter cotação:', error);
    messageError.value = 'Erro ao obter cotação';
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await getQuotations();
});
</script>

<template>
  <TipHeader />
  <TipLoading  v-if="isLoading" />
  <main class="main-content" v-else>
    <TipCalculatorForm 
      v-show="showForm"
      :isMobile="isMobile"
      v-model:form="form"
      @update:showSummary="setActiveSectionWhenMobile($event)" />
    <TipSummary 
      v-show="showSummary"
      :isMobile="isMobile"
      :form="form"
      :quotations="quotations" 
      @update:showSummary="setActiveSectionWhenMobile($event)"/>
  </main>
</template>
