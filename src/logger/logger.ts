import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { MyLogger } from './mylogger.service'

export function logger(message:any, context:any, type:string, stack:string = '') {
    try {
        if(type === 'ERROR') {
            const dir = join('./', 'logs', `ERROR`)
            if (!existsSync('./'+dir)) {
                mkdirSync(dir)
            }
            const newLog = `${type}${message} - ${stack}'\n'`
            let filePath = join(dir, MyLogger.lastLog.toString())
            writeFileSync(filePath+'.txt', newLog, {flag: 'as'})
        } else {
            const dir = join('./', 'logs')
            if (!existsSync('./'+dir)) {
                mkdirSync(dir);
            }
            const newLog = `${type}${context} - ${message}'\n'`
            let filePath = join('./logs', MyLogger.lastLog.toString())
            writeFileSync(filePath+'.txt', newLog, {flag: 'as'})
        }
    } catch (error) {
        writeFileSync('./logs/errors.txt', JSON.stringify(error)+'\n', {flag: 'as'})
    }
}