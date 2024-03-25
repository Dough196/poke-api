import express from 'express'
import { index, refresh, generation } from '../controllers/pokemonController.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()

router.get('/', protect, index)
router.post('/refresh', protect, refresh)
router.get('/generation', protect, generation)

export default router
