import { defineConfig } from 'drizzle-kit'
import env from './config/env.config'


export default defineConfig({
    schema: ['src/database/models'],
    out: 'src/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:5432/${env.POSTGRES_DB}`
    }
})
