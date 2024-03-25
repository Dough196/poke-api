<template>
  <div class="container mx-auto px-6">
    <div class="w-1/2 mx-auto">
      <div class="flex items-center">
        <div class="flex-grow pe-2">
          <select class="w-full form-input h-12" id="generation" v-model="selectedGeneration">
            <option :value="null">Select a generation...</option>
            <option
              v-for="(generation, index) in generations"
              :key="index"
              :value="generation.value"
            >
              {{ generation.name }}
            </option>
          </select>
        </div>
        <div class="ps-2">
          <button
            class="btn-primary me-2"
            :class="{ disabled: !selectedGeneration || loading }"
            @click="refreshPokemonsData"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
    <div class="w-2/3 mx-auto">
      <div class="flex items-center my-4">
        <div class="relative flex-grow pe-2">
          <input
            v-model="name"
            type="text"
            class="form-input w-full h-12"
            placeholder="Search pokemon..."
            @blur="searchEmptyFormatter"
          />
          <button
            v-if="name"
            class="absolute bottom-1/2 translate-y-1/2 right-4"
            @click="clearFilters"
          >
            <div class="flex items-center"><vue-feather type="x" size="30" stroke="#1E3A8A" /></div>
          </button>
        </div>
        <div class="ps-2">
          <button
            class="btn-primary me-2"
            :class="{ disabled: !name || loading }"
            @click="getPokemons"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <template v-if="loadError.status">
        <div class="bg-red/50 border border-red p-6 mb-6 rounded-3xl text-danger">
          {{ loadError.message }}
        </div>
      </template>
      <template v-if="loading">
        <div class="flex justify-center mb-6">
          <vue-feather type="loader" animation="spin" stroke="#00B0BD" size="35" />
        </div>
      </template>
      <template v-if="!loading && !loadError.status">
        <div class="flex flex-wrap -mx-4">
          <PokemonCard :key="pokemon.id" v-for="pokemon in pokemons.data" :pokemon="pokemon" />
        </div>
      </template>
    </div>
    <div class="mb-10">
      <div class="flex justify-center items-center">
        <button class="me-1" :disabled="currentPage === 1" @click="updateCurrentPage(1)">
          <div class="flex items-center">
            <vue-feather type="chevrons-left" size="20" stroke="#1E3A8A" />
          </div>
        </button>
        <button
          class="mx-1"
          :disabled="currentPage === 1"
          @click="updateCurrentPage(currentPage - 1)"
        >
          <div class="flex items-center">
            <vue-feather type="chevron-left" size="20" stroke="#1E3A8A" />
          </div>
        </button>
        <div class="mx-1">
          <div class="flex items-center">
            <input
              v-model="currentPage"
              type="number"
              class="block border border-disabled-button rounded-lg py-0 px-3 w-20 me-1"
              @input="pageFormatter"
              @blur="pageEmptyFormatter"
              @focus="(e) => e.target.select()"
            />
            <span>of {{ lastPage }} page(s)</span>
          </div>
        </div>
        <button
          class="mx-1"
          :disabled="currentPage >= lastPage"
          @click="updateCurrentPage(currentPage + 1)"
        >
          <div class="flex items-center">
            <vue-feather type="chevron-right" size="20" stroke="#1E3A8A" />
          </div>
        </button>
        <button
          class="ms-1"
          :disabled="currentPage >= lastPage"
          @click="updateCurrentPage(lastPage)"
        >
          <div class="flex items-center">
            <vue-feather type="chevrons-right" size="20" stroke="#1E3A8A" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '@/services/api'

import PokemonCard from '@/components/PokemonCard.vue'

const loading = ref(false)
const loadError = ref({
  status: false,
  message: 'Error loading properties data'
})
const currentPage = ref(1)
const perPage = ref(12)
const name = ref('')
const pokemons = ref({})
const generations = ref([])
const selectedGeneration = ref(null)

const lastPage = computed(() => {
  return pokemons.value.totalPages || 1
})

onMounted(() => {
  getPokemons()
  getGenerations()
})

const getPokemons = () => {
  loading.value = true
  api
    .get('/pokemon', {
      params: {
        name: name.value,
        page: currentPage.value,
        perPage: perPage.value
      }
    })
    .then((r) => {
      pokemons.value = r.data
      loading.value = false
      if (pokemons.value.totalItems == 0) {
        loadError.value.status = true
        loadError.value.message = 'Pokemons not loaded: select generation to load data'
      }
    })
    .catch(() => {
      loadError.value.status = true
      loadError.value.message = 'Error fetching pokemons data'
      loading.value = false
    })
}

const getGenerations = () => {
  api
    .get('/pokemon/generation')
    .then((r) => {
      generations.value = r.data.generations
    })
    .catch(() => {
      loadError.value.status = true
      loadError.value.message = 'Error fetching generations data'
    })
}

const refreshPokemonsData = () => {
  loading.value = true
  api
    .post('/pokemon/refresh', {}, { params: { generation: selectedGeneration.value } })
    .then((r) => {
      loading.value = false
      getPokemons()
    })
    .catch(() => {
      loadError.value.status = true
      loadError.value.message = 'Error loading new pokemons data'
      loading.value = false
    })
}

const pageFormatter = () => {
  const value = currentPage.value
  if (value && !isNaN(value)) {
    if (value >= lastPage.value) {
      currentPage.value = lastPage.value
    } else if (value <= 0) {
      currentPage.value = 1
    }
    getPokemons()
  }
}

const updateCurrentPage = (newValue) => {
  currentPage.value = newValue
  getPokemons()
}

const pageEmptyFormatter = () => {
  const value = currentPage.value
  if (!value) {
    currentPage.value = 1
    getPokemons()
  }
}

const searchEmptyFormatter = () => {
  if (!name.value) {
    getPokemons()
  }
}

const clearFilters = () => {
  name.value = ''
  getPokemons()
}
</script>
