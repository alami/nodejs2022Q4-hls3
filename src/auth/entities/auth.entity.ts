import { Body, Controller, Injectable, Post } from "@nestjs/common"
import { AuthService } from "../auth.service"
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    loginPlatform(@Body() body: any) {}
    @Post('signup')
    createProfile(@Body() body: any) {}
}