import { gte, lte } from "drizzle-orm"
import { PgSelect } from "drizzle-orm/pg-core"
import { InvestmentsTable } from "../database/models/investment.model"
import { TimeFrame } from "../enums/investment.enum"


export function withFromDate<T extends PgSelect>(
    qb: T,
    from: Date
) {
    return qb.where(gte(InvestmentsTable.created_at, from))
}

export function withToDate<T extends PgSelect>(
    qb: T,
    to: Date
) {
    return qb.where(lte(InvestmentsTable.created_at, to))
}

export function withAmountGreaterThan<T extends PgSelect>(
    qb: T,
    timeframe: TimeFrame
) {
    // return the results gouped by the timeframe specified
    // if the timeframe is not specified, return all results

    
    return qb
}