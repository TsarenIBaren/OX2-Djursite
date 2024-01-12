import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import BirdView from '../views/BirdView.vue'
import SheepView from '../views/SheepView.vue'
import FishView from '../views/FishView.vue'
import BeeView from '../views/BeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/birds',
      name: 'birds',
      component: BirdView
    },
    {
      path: '/sheep',
      name: 'sheep',
      component: SheepView
    },
    {
      path: '/fish',
      name: 'fish',
      component: FishView
    },
    {
      path: '/bees',
      name: 'bees',
      component: BeeView
    },
  ]
})

export default router
