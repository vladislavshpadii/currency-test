<script setup lang="ts">
import { computed, ref } from 'vue'

import { useCurrencyStore } from '@/stores/currency'

import type { Currency } from '@/types/currency'

const currencyStore = useCurrencyStore()

const search = ref('')

const currencies = computed<Currency[]>(() =>
  currencyStore.currencies.filter((currency: Currency) =>
    currency.txt.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const tableHeader = [
  { title: 'Currency Name', value: 'txt' },
  { title: 'Exchange rate', value: 'rate' },
  { title: 'Exchange date', value: 'exchangedate' },
]
</script>

<template>
  <v-text-field class="w-25" v-model="search" placeholder="Search currency"></v-text-field>
  <v-data-table :items="currencies" :headers="tableHeader" class="w-100">
    <template v-slot:item="{ item }">
      <tr>
        <td>
          <RouterLink :to="`/edit-currency/${item.cc}`">{{ item.txt }}</RouterLink>
        </td>
        <td>
          {{ item.rate }}
        </td>
        <td>
          {{ item.exchangedate }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
