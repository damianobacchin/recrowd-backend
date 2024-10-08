import { RequestHandler } from "express"
import env from "../config/env.config"
import { AuthTable } from "../database/models/auth.model"
import { db } from "../database"
import { eq } from "drizzle-orm"
import { AuthLevel } from "../enums/auth.enum"

export const BasicAuth: RequestHandler = (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth) {
        req.auth = false
        return next()
    }

    // Basic auth
    const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':')

    // Verify credentials
    if (username === env.AUTH_USERNAME && password === env.AUTH_PASSWORD) {
        req.auth = true
        return next()
    }
    return next({ status: 401, message: 'Wrong credentials' })
}


export const TokenAuth = (level: AuthLevel): RequestHandler => {
    return async (req, res, next) => {
        const token = req.headers['x-auth-token'] as string

        if (!token) return next({ status: 401, message: 'Unauthorized' })

        // Verify token
        const auth = await db.select()
            .from(AuthTable)
            .where(eq(AuthTable.id, token))

        if (auth.length > 0) {
            const userLevel = auth[0].level as AuthLevel
            if (userLevel === level) {
                req.level = level
                return next()
            } else {
                return next({ status: 403, message: 'Forbidden' })
            }
        }

        return next({ status: 401, message: 'Wrong token' })
    }
}