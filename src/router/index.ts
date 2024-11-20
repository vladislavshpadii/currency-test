import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditCurrency from '../views/EditCurrency.vue'
import ChangedCurrencies from '../views/ChangedCurrencies.vue'
import SearchCurrency from '../views/SearchCurrency.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edit-currency/:cc',
      name: 'editCurrency',
      component: EditCurrency,
    },
    {
      path: '/changed-currencies',
      name: 'changedCurrencies',
      component: ChangedCurrencies,
    },
    {
      path: '/search-currency',
      name: 'searchCurrency',
      component: SearchCurrency,
    },
  ],
})

export default router
