import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import env from '../config/env.config'

const pool = new Pool({
    connectionString: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:5432/${env.POSTGRES_DB}`
})

export const db = drizzle(pool)