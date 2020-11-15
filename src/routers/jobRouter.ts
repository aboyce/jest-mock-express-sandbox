// Libraries
import express from 'express'

// Controllers
import * as jobController from '../controllers/jobController'

const router = express.Router()

router.get('/count', jobController.getCount)

router.get('/all', jobController.getAll)

router.get('/one/:id', jobController.get)

export default router
