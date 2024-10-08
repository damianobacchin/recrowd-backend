import { Router } from 'express'
import { handler } from '../lib/handler'
import * as controller from '../controllers/auth.controller'
import { BasicAuth } from '../auth/middleware'

const router = Router()


router.get('/authorize', BasicAuth, handler(controller.authorize))

export default router