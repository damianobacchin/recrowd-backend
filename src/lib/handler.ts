import { NextFunction, Request, Response } from 'express'
import { unlinkSync } from 'fs'

export const handler = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: Error) => next(err))
    }
}