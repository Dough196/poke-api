import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
const port = process.env.PORT || 5050
import pokemonRoutes from './routes/pokemon.js'
import userRoutes from './routes/user.js'

connectDB()

const app = express()

app.use(
  cors({
    origin: process.env.CORS_DOMAIN,
    credentials: true
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/pokemon', pokemonRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Server is ready')
})

// app.use(notFound)
// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
