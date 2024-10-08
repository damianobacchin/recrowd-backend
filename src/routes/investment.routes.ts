import { Router } from 'express'
import { handler } from '../lib/handler'
import * as controller from '../controllers/investment.controller'
import { TokenAuth } from '../auth/middleware'
import { AuthLevel } from '../enums/auth.enum'

const router = Router()


router.get('/', TokenAuth(AuthLevel.R), handler(controller.getInvestments))
router.post('/', TokenAuth(AuthLevel.RW), handler(controller.createInvestment))

export default router