import { Request, Response, NextFunction } from 'express-serve-static-core'

const allowCrossDomain = (req: any, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,authorization')
    res.header('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
}

const logRequest = (req: any, res: Response, next: NextFunction) => {
    if (req.method !== 'OPTIONS') {
        req.startTime = Date.now()

        res.on('finish', () => {
            let requestDuration = Date.now() - req.startTime;

            (<IGlobal>global).loggerUtil().request({
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                duration: requestDuration
            })
        })
    }

    if (next()) {
        next()
    }
}

export {allowCrossDomain, logRequest}
