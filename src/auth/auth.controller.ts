import {Body, Controller, HttpCode, Post, ValidationPipe} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {AuthDto} from "./dto/login.dto";
import {AuthRefTokenDto} from "./dto/AuthRefTokenDto";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    @HttpCode(201)
    loginPlatform(@Body(new ValidationPipe()) body: AuthDto) {
        return this.authService.login(body);
    }
    @Post('signup')
    @HttpCode(200)
    createProfile(@Body(new ValidationPipe()) body: AuthDto) {
        return this.authService.register(body)
    }
    @Post('refresh')
    @HttpCode(200)
    refreshToken(@Body(new ValidationPipe()) body: AuthRefTokenDto) {
        return this.authService.refreshToken(body)
    }
}