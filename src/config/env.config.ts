import { config } from "dotenv"
config()

const env = {
    PORT: Number(process.env.PORT!),
    
    POSTGRES_USER: process.env.POSTGRES_USER!,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
    POSTGRES_DB: process.env.POSTGRES_DB!,

    AUTH_USERNAME: process.env.AUTH_USERNAME!,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD!,
}

export default env