import { RequestHandler } from "express"
import { InvestmentsTable } from "../database/models/investment.model"
import { db } from "../database"
import { withFromDate, withToDate } from "../lib/query"
import { TimeFrame } from "../enums/investment.enum"
import { sql } from 'drizzle-orm'

export const getInvestments: RequestHandler = async (req, res) => {
    const from = req.query.from as string | undefined
    const to = req.query.to as string | undefined
    const timeframe = req.query.timeframe as TimeFrame | undefined || TimeFrame.D


    // Get investments stats
    let timeslotQuery = sql`DATE(${InvestmentsTable.created_at})`
    switch (timeframe) {
        case TimeFrame.D:
            timeslotQuery = sql`DATE(${InvestmentsTable.created_at})`
            break
        case TimeFrame.W:
            timeslotQuery = sql`DATE_TRUNC('week', ${InvestmentsTable.created_at})`
            break
        case TimeFrame.M:
            timeslotQuery = sql`DATE_TRUNC('month', ${InvestmentsTable.created_at})`
            break
        case TimeFrame.Y:
            timeslotQuery = sql`DATE_TRUNC('year', ${InvestmentsTable.created_at})`
            break
        default:
            throw new Error('Invalid timeframe')
    }

    let query = db.select({
        [timeframe]: timeslotQuery.as('timeslot'),
        number: sql`CAST(COUNT(*) AS INTEGER)`.as('number'),
        total: sql`SUM(${InvestmentsTable.amount})`.as('total')
    })
        .from(InvestmentsTable)
        .$dynamic()

    if (from) withFromDate(query, new Date(from))
    if (to) withToDate(query, new Date(to))

    query.groupBy(timeslotQuery)
    query.orderBy(timeslotQuery)

    const investmentStats = await query.execute()

    // Get investments
    const investmentDataQuery = db.select()
        .from(InvestmentsTable)
        .$dynamic()

    if (from) withFromDate(investmentDataQuery, new Date(from))
    if (to) withToDate(investmentDataQuery, new Date(to))

    const investmentData = await investmentDataQuery.execute()

    return res.json({
        stats: investmentStats,
        data: investmentData
    })
}

export const createInvestment: RequestHandler = async (req, res) => {
    const { amount, apr, confirmed_at } = req.body

    if (!amount || !apr || !confirmed_at) {
        throw new Error('Missing required fields')
    }

    await db.insert(InvestmentsTable)
        .values({
            amount,
            apr,
            confirmed_at: new Date(confirmed_at)
        })

    return res.sendStatus(201)
}