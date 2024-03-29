// Libraries
import express from 'express'

// Controllers
import * as userController from '../controllers/userController'

const router = express.Router()

router.get('/logged-in', userController.isUserLoggedIn)

router.get('/profile', userController.getRequestingUser)

router.get('/count', userController.getCount)

router.get('/all', userController.getAll)

router.get('/all/premium', userController.getAllPremium)

router.get('/one/:id', userController.get)

export default router
