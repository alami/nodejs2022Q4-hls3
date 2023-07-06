import { ConsoleLogger } from '@nestjs/common'
import { LEVELS } from './level.logger';
import { logger } from './logger';
export class MyLogger extends ConsoleLogger {
    constructor() {
        super();
        this.setLogLevels(LEVELS[process.env.LOG_LEVEL_MID]);
    }
    static lastLog = Date.now()
    error(message: any, stack?: string, context?: string) {
        logger(message, '', 'ERROR', stack);
        super.error(message, stack);
    }
    log(message: any, context) {
        logger(message, context, 'LOG');
        super.log(message, context);
    }
    warn(message: any, context) {
        logger(message, context, 'WARN');
        super.warn(message, context);
    }
    debug(message: any, context) {
        logger(message, context, 'DEBUG');
        super.debug(message, context);
    }
    verbose(message: any, context) {
        logger(message, context, 'VERBOSE');
        super.verbose(message, context);
    }
}