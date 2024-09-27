import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/OrderFormView.vue')
    },
    {
      path: '/vipform',
      name: 'vipform',
      component: () => import('../views/OrderFormView.vue')
    },
    {
      path: '/pending',
      name: 'pending',
      component: () => import('../views/PendingListView.vue')
    },
    {
      path: '/complete',
      name: 'complete',
      component: () => import('../views/CompleteListView.vue')
    },
    {
      path: '/bot',
      name: 'bot',
      component: () => import('../views/BotListView.vue')
    }, {
      path: '/logout',
      name: 'logout',
      component: LoginView
    },
  ]
})

export default router