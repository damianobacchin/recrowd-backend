import express, { Request, Response, NextFunction } from 'express'

import logger from './services/logger'
import env from "./config/env.config"
import { routes } from './routes'


// Express
const app = express()
app.use(express.json())



app.listen(env.PORT, () => logger.info('>>> Server started on port ' + env.PORT))

// Load routes
routes(app)

// Error middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    return res.status(err.status || 500).json(err.message || 'Internal server error')
})


app.get('/', (req: Request, res: Response) => res.sendStatus(200))
