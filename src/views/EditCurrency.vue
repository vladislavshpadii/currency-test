<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCurrencyStore } from '@/stores/currency'

import type { Currency } from '@/types/currency'

const currencyStore = useCurrencyStore()

const route = useRoute()
const router = useRouter()

const currencyCC = computed(() => route.params.cc)

const currencyAmount = ref(0)
const validForm = ref(false)

const currencyAmountRule = [
  (value: number) => {
    if (value) return true

    return 'Field cant be empty'
  },
]

onMounted(async () => {
  const dateNow = new Date()
  const payload = {
    valcode: route.params.cc as string,
    date: `${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDate()}`,
  }

  const currentCurrency: Currency = (await currencyStore.getCurrenciesInfo(payload)) as Currency
  currencyAmount.value = currentCurrency.rate
})

async function updateCurrency() {
  if (validForm) {
    try {
      await currencyStore.updateCurrency(currencyAmount.value)
      router.push({ name: 'changedCurrencies' })
    } catch (e) {
      alert(e)
    }
  }
}
</script>

<template>
  <h1>Edit currency {{ currencyCC }}</h1>
  <v-form class="d-flex align-center" @submit.prevent="updateCurrency" v-model="validForm">
    <v-text-field :disabled="true" :value="currencyCC"></v-text-field>
    <v-number-input :rules="currencyAmountRule" v-model="currencyAmount"></v-number-input>
    <v-btn class="edit-currency-submit" type="submit">Update</v-btn>
  </v-form>
</template>

<style lang="scss">
.edit-currency-submit {
  margin-top: -15px;
  margin-left: 10px;
}
</style>
