<template>
  <div
    class="pokemon-card p-3 m-4 w-1/5 border-2 rounded-xl"
    :class="cardClassVariants[pokemon.color]"
  >
    <div class="font-bold" :class="textClassVariants[pokemon.color]">#{{ pokemon.order }}</div>
    <div class="relative h-32">
      <img
        class="absolute h-32 bottom-0 right-1/2 translate-x-1/2"
        :src="`${pokemon.image}`"
        :alt="`${pokemon.name} image`"
      />
    </div>
    <div class="w-full text-center text-lg font-bold" :class="textClassVariants[pokemon.color]">
      {{ toUpperCamelCase(pokemon.name) }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    default: () => {}
  }
})
const cardClassVariants = {
  black: 'bg-black/50 border-black',
  blue: 'bg-blue/50 border-blue',
  brown: 'bg-brown/50 border-brown',
  gray: 'bg-gray/50 border-gray',
  green: 'bg-green/50 border-green',
  pink: 'bg-pink/50 border-pink',
  purple: 'bg-purple/50 border-purple',
  red: 'bg-red/50 border-red',
  white: 'bg-white/50 border-black',
  yellow: 'bg-yellow/50 border-yellow'
}

const textClassVariants = {
  black: 'text-black',
  blue: 'text-blue',
  brown: 'text-brown',
  gray: 'text-gray',
  green: 'text-green',
  pink: 'text-pink',
  purple: 'text-purple',
  red: 'text-red',
  white: 'text-black',
  yellow: 'text-yellow'
}

const toUpperCamelCase = (text) => {
  return text
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toUpperCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
</script>
