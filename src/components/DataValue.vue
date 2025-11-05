<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { coins } from '../scripts/coins';
import Quotation from '../clients/QuotationClient';

const selectedValue = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);
const exchangeRate = ref(1);
const isLoading = ref(false);
const messageError = ref('');

const tipValue = computed(() => accountValue.value * tip.value / 100);
const totalValue = computed(() => accountValue.value + tipValue.value);
const perPersonValue = computed(() => totalValue.value / people.value);
const valueInBRL = computed(() => {
  if (perPersonValue.value === 0) return 0;
  return perPersonValue.value * exchangeRate.value;
});

async function updateExchangeRate() {
  if (!selectedValue.value) return;

  try {
    isLoading.value = true;
    const quotation = new Quotation(selectedValue.value.value, 'brl');

    exchangeRate.value = await quotation.getQuotationFromApi();
  } catch (error) {
    console.error('Erro ao obter cotação:', error);
    messageError.value = 'Erro ao obter cotação';
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await updateExchangeRate();
});

watch(selectedValue, async () => {
  messageError.value = '';
  await updateExchangeRate();
});
</script>

<template>
  <div>
    <div class="d-flex align-items-center gap-2" v-for="coin in coins" :key="coin.value">
      <input type="radio" v-model="selectedValue" :value="coin" :id="coin.value" />
      <label :for="coin.value">{{ coin.label }}</label>
    </div>
    Valor {{ selectedValue?.signal }} <input type="number" v-model="accountValue" min="0" />

    <div>
      <label for="tipRange">Gorjeta: {{ tip }}%</label>
      <input type="range" id="tipRange" min="10" max="20" v-model="tip" />
    </div>

    <div>
      <label for="tipRange">Pessoas: {{ people }}</label>
      <input type="range" id="peopleRange" min="2" max="16" v-model="people" />
    </div>
  </div>

  <hr/>

  <div>
    <div>
      <span>Conta:</span>
      <p>{{ selectedValue?.signal }} {{ accountValue }}</p>
    </div>
    <div>
      <span>Gorjeta:</span>
      <p>{{ selectedValue?.signal }} {{ tipValue.toFixed(2) }}</p>
    </div>
    <div>
      <span>Total:</span>
      <p>{{ selectedValue?.signal }} {{ totalValue.toFixed(2) }}</p>
    </div>
    <div>
      <span>Por Pessoa:</span>
      <p>{{ selectedValue?.signal }} {{ perPersonValue.toFixed(2) }}</p>
    </div>
    <div>
      <span>em R$:</span>
      <p v-if="isLoading">Carregando...</p>
      <p v-else>R$ {{ valueInBRL.toFixed(2) }}</p>
    </div>
    <div v-if="messageError">
      <span>Erro: </span>
      <span>{{ messageError }}</span>
    </div>
  </div>

</template>

<style scoped></style>
