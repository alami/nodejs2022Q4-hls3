import { IsNotEmpty, IsString } from "class-validator";
export class AuthRefTokenDto {
    @IsString()
    @IsNotEmpty()
    refreshToken:string
}