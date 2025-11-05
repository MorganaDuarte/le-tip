<script setup lang="ts">
import { ref, computed } from 'vue';
import { coins } from '../scripts/coins';

const selectedValue = ref(coins[0]);
const accountValue = ref(0);
const tip = ref(10);
const people = ref(2);

const tipValue = computed(() => accountValue.value * tip.value / 100);
const totalValue = computed(() => accountValue.value + tipValue.value);
const perPersonValue = computed(() => totalValue.value / people.value);
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
      <p>{{ selectedValue?.signal }} {{ tipValue }}</p>
    </div>
    <div>
      <span>Total:</span>
      <p>{{ selectedValue?.signal }} {{ totalValue }}</p>
    </div>
    <div>
      <span>Por Pessoa:</span>
      <p>{{ selectedValue?.signal }} {{ perPersonValue }}</p>
    </div>
  </div>

</template>

<style scoped></style>
