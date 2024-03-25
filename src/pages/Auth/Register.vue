<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

import useAuth from '@/composables/auth'

const formData = ref({
  name: '',
  email: '',
  password: ''
})

const router = useRouter()

const register = () => {
  api
    .post('/user', {
      ...formData.value
    })
    .then((r) => {
      if (r.data) {
        // set user to keep track of logged in user
        const { user } = useAuth()
        user.value = r.data
        document.cookie = `jwt=${r.data.token}; path=/`

        // redirect to dashboard
        router.push('/pokemon')
      }
    })
    .catch((err) => console.error(err))
}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="w-1/2 m-auto">
      <div class="mb-5">
        <h1 class="text-title">Register</h1>
      </div>
      <form @submit.prevent="register" class="bg-white p-6 mb-6 rounded-3xl">
        <div class="w-full mb-4">
          <label class="txt-label">Name</label
          ><input name="name" v-model="formData.name" type="text" class="form-input w-full" />
        </div>
        <div class="w-full mb-4">
          <label class="txt-label">Email</label
          ><input name="email" v-model="formData.email" type="email" class="form-input w-full" />
        </div>
        <div class="w-full mb-4">
          <label class="txt-label">Password</label
          ><input
            name="password"
            v-model="formData.password"
            type="password"
            class="form-input w-full"
          />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>
