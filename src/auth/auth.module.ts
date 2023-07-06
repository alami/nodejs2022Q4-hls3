import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport";
import { JwtAccessStrategy, JwtRefreshStrategy } from "./token.strategy";

import * as dotenv from 'dotenv'
dotenv.config();
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRE_TIME
            },
        }),
    ],
    providers: [
        AuthService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
    controllers: [AuthController],
    exports: []
})
export class AuthModule {}