import {pgTable, pgEnum, uuid, timestamp, real} from 'drizzle-orm/pg-core'
import {AuthLevel} from "../../enums/auth.enum"

export const AuthLevelEnum = pgEnum('AuthLevelEnum', Object.values(AuthLevel) as [string, ...string[]])

export const AuthTable = pgTable(
    "auth",
    {
        id: uuid('id').primaryKey().defaultRandom(),
        level: AuthLevelEnum('level').notNull().default(AuthLevel.R),
        created_at: timestamp('created_at').notNull().defaultNow(),
        used_at: timestamp('used_at'),
    }
)

export type AuthSelect = typeof AuthTable.$inferSelect
export type AuthInsert = typeof AuthTable.$inferInsert