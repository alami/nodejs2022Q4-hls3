import { ConsoleLogger } from '@nestjs/common'
export class MyLogger extends ConsoleLogger {
    constructor() {
        super();
        this.setLogLevels(['log', 'error', 'warn'],);
    }
    static lastLog = Date.now()
    error(message: any, stack?: string, context?: string) {
        // logger(message, '', 'ERROR', stack);
        console.log(message,context, stack, 'ERROR');
        super.error(message, stack);
    }
    log(message: any, context) {
        // logger(message, context, 'LOG');
        console.log(message, context, 'LOG');
        super.log(message, context);
    }
    warn(message: any, context) {
        // logger(message, context, 'WARN');
        console.log(message, context, 'WARN');
        super.warn(message, context);
    }
    debug(message: any, context) {
        // logger(message, context, 'DEBUG');
        console.log(message, context, 'DEBUG');
        super.debug(message, context);
    }
    verbose(message: any, context) {
        // logger(message, context, 'VERBOSE');
        console.log(message, context, 'VERBOSE');
        super.verbose(message, context);
    }
}