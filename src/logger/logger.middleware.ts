import {Injectable, Logger, NestMiddleware} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP')
    use(req: Request, res: Response, next: NextFunction) {
        const {originalUrl, body, method, query} = req
        res.on('finish', ()=>{
            const statCode = res.statusCode;
            this.logger.log(
                `${method} ${originalUrl} Query_Params: ${JSON.stringify(query)}, Body: ${JSON.stringify(body)} code: ${statCode}`,
            )
        });
        next();
    }
}