<template>
  <div class="w-full py-4 bg-gray mb-6">
    <div class="container mx-auto flex justify-between items-center">
      <div></div>
      <div>
        <RouterLink :to="user ? '/pokemon' : '/'">
          <img class="max-h-20" src="/img/logo.svg" alt="Royton Logo" />
        </RouterLink>
      </div>
      <div>
        <template v-if="!user">
          <RouterLink class="text-white me-4" to="/login">Login</RouterLink>
          <RouterLink class="text-white" to="/register">Register</RouterLink>
        </template>
        <template v-else>
          <button @click="logout" class="text-white">Logout</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useAuth from '@/composables/auth'
import api from '@/services/api'

const router = useRouter()
const { user, checkAuth } = useAuth()
checkAuth()

const logout = () => {
  api
    .post('/user/logout')
    .then(() => {
      user.value = null
      router.push('/')
    })
    .catch((err) => console.error(err))
}
</script>
