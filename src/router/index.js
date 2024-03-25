import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Auth/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/Auth/Register.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () => import('@/pages/Pokemon/Index.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
