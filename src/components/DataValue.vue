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
const totalValue = computed(() => !accountValue.value ? 0 : accountValue.value + tipValue.value);
const perPersonValue = computed(() => totalValue.value / people.value);
const valueInBRL = computed(() => perPersonValue.value * exchangeRate.value);

async function updateExchangeRate() {
  if (!selectedValue.value) return;

  try {
    isLoading.value = true;
    const quotation = new Quotation(selectedValue.value.value, 'BRL');

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
  <div class="text-center mb-12">
    <h1>Le/Tip</h1>
    <p>Calculadora de gorjetas inteligente</p>
  </div>
  <div>
     <div class="currency-selector">
      <button v-for="coin in coins" :key="coin.value"
        :class="['currency-selector__button', { 'currency-selector__button--active': selectedValue?.value === coin.value }]" @click="selectedValue = coin">
      {{ coin.label }}
      </button>
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

<style scoped>
.currency-selector {
 display: flex;
 background-color: white;
 border-radius: 50px;
 padding: 4px;
 width: fit-content;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
 border: 1px solid #f0f0f0;
}
.currency-selector__button {
 border: none;
 background: none;
 padding: 10px 25px;
 border-radius: 50px;
 font-size: 16px;
 font-weight: 500;
 color: #8F9BB3;
 cursor: pointer;
 transition: all 0.3s ease;
}
.currency-selector__button--active {
 background-color: #96CE00;
 color: white;
}
</style>
