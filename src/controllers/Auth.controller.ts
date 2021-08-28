import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AuthDTO } from "src/dtos/Auth.dto";
import { AuthService } from "src/services/Auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(authDTO: AuthDTO) {
        return await this.authService.authenticateUser(authDTO)
    }
}