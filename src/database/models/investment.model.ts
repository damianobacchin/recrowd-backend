import {pgTable, uuid, timestamp, real} from 'drizzle-orm/pg-core'

export const InvestmentsTable = pgTable(
    "investments",
    {
        id: uuid('id').primaryKey().defaultRandom(),
        amount: real('amount').notNull(),
        apr: real('apr').notNull(),
        created_at: timestamp('created_at').notNull().defaultNow(),
        confirmed_at: timestamp('confirmed_at'),
    }
)

export type InvestmentSelect = typeof InvestmentsTable.$inferSelect
export type InvestmentInsert = typeof InvestmentsTable.$inferInsert