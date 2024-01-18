import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import LiveView from '../views/LiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitiesView
    },
    {
      path: '/live',
      name: 'live',
      component: LiveView
    },
  ]
})

export default router
