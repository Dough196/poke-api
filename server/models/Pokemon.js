import mongoose from 'mongoose'

const PokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

export default Pokemon
