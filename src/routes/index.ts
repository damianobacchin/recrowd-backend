import { Application } from 'express'

import authRoutes from './auth.routes'
import investmentRoutes from './investment.routes'


export const routes = (app: Application) => {
    app.use('/auth', authRoutes)
    app.use('/investment', investmentRoutes)
}