import { Injectable } from "@nestjs/common";
import { DbService } from "src/models/db.service";
@Injectable()
export class AuthService {
    constructor(
        private db: DbService,
    ) {}
    async login() {}
    async getToken() {}
    async register() {}
    async refreshToken() {}
}