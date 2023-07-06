import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import {ForbiddenException, Injectable} from '@nestjs/common'
import { Payload } from '../models/interfaces'
import { Request } from 'express';
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-at') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }
    async validate(payload: Payload) {
        console.log('at:', payload);
        return {
            userId: payload.sub,
            login: payload.login
        };
    }
}
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
            passReqToCallback: true,
        });
    }
    validate(req: Request, payload: Payload) {
        const refreshToken = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            .trim();
        if (!refreshToken) {
            throw new ForbiddenException('Refresh token malformed');
        }
        console.log('refreshToken:', refreshToken);
        return { ...payload, refreshToken };
    }
}