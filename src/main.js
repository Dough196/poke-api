import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'
import useAuth from './composables/auth.js'

createApp(App).use(router).component(VueFeather.name, VueFeather).mount('#app')

router.beforeEach(async (to, from, next) => {
  const { checkAuth } = useAuth()
  if (to.meta.requiresAuth) {
    if (!(await checkAuth())) {
      return next({ name: 'login' })
    }
  } else if (to.meta.guest) {
    if (await checkAuth()) {
      return next({ name: 'pokemon' })
    }
  }
  next()
})
