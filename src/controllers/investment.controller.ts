import { RequestHandler } from "express"
import { InvestmentsTable } from "../database/models/investment.model"
import { db } from "../database"
import { withFromDate, withToDate } from "../lib/query"
import { TimeFrame } from "../enums/investment.enum"

export const getInvestments: RequestHandler = async (req, res) => {
    const from = req.query.from as string | undefined
    const to = req.query.to as string | undefined
    const timeframe = req.query.timeframe as TimeFrame | undefined

    let query = db.select().from(InvestmentsTable).$dynamic()

    if (from) withFromDate(query, new Date(from))
    if (to) withToDate(query, new Date(to))

    const dbInvestments = await query.execute()

    return res.json(dbInvestments)
}

export const createInvestment: RequestHandler = async (req, res) => {
    const { amount, apr, confirmed_at } = req.body

    if (!amount || !apr || !confirmed_at) {
        throw new Error('Missing required fields')
    }

    const confirmationDate = new Date(confirmed_at)

    await db.insert(InvestmentsTable)
        .values({
            amount,
            apr,
            confirmed_at: confirmationDate
        })

    return res.sendStatus(201)
}