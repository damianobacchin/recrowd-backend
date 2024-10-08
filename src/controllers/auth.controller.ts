import { RequestHandler } from "express"
import { AuthTable } from "../database/models/auth.model"
import { db } from "../database"
import { AuthLevel } from "../enums/auth.enum"


export const authorize: RequestHandler = async (req, res) => {

    const level = req.auth ? AuthLevel.RW : AuthLevel.R

    const auth = await db.insert(AuthTable)
        .values({ level })
        .returning({ id: AuthTable.id })

    res.json(auth[0])
}