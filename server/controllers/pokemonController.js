import axios from 'axios'
import Pokemon from '../models/Pokemon.js'

const index = async (req, res) => {
  const query = {}
  if (req.query.name) {
    query.name = { $regex: req.query.name, $options: 'i' } // Case-insensitive search
  }
  const pageNumber = req.query.page || 1
  const perPage = req.query.perPage || 10

  // Calculate the number of documents to skip based on the page number and page size
  const skip = (pageNumber - 1) * perPage

  // Query the total count of documents
  const totalCount = await Pokemon.countDocuments(query)

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / perPage)

  // Query the database for a paginated list of Pokemon
  const pokemonList = await Pokemon.find(query).skip(skip).limit(perPage)

  // Prepare pagination information
  const paginationInfo = {
    totalItems: totalCount,
    totalPages: totalPages,
    currentPage: pageNumber,
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === totalPages
  }

  res.status(200).json({ data: pokemonList, ...paginationInfo })
}

const refresh = async (req, res) => {
  try {
    await Pokemon.deleteMany()

    const generation = req.query.generation || 1

    // Fetch data from the main API endpoint
    const response = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}`)
    const { pokemon_species } = response.data

    // Process each Pokemon species
    for (let species of pokemon_species) {
      const { name, url } = species
      const speciesResponse = await axios.get(url)
      const { color, order } = speciesResponse.data

      // Create a new Pokemon document and save it to the database
      await Pokemon.create({
        name,
        color: color.name,
        order,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${order}.svg`
      })
    }

    res.status(200).json({ message: 'Pokemons Loaded' })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
  }
}

const generation = async (req, res) => {
  const response = await axios.get('https://pokeapi.co/api/v2/generation')
  const { results } = response.data
  const generations = results.map((e) => {
    const nameParts = e.name.split('-')
    const parsedName = nameParts
      .map((part, index) => {
        return index === 0
          ? part.charAt(0).toUpperCase() + part.substr(1).toLowerCase()
          : part.toUpperCase()
      })
      .join(' ')

    const urlParts = e.url.split('/')
    const lastSection = urlParts[urlParts.length - 2]
    const number = parseInt(lastSection, 10)
    return { name: parsedName, value: number }
  })
  res.status(200).json({ generations })
}

export { index, refresh, generation }
