declare namespace Express {
    export interface Request {
        auth?: boolean
        level?: 'r' | 'rw'
    }
}