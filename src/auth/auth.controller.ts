import { Body, Controller, Get, Param, Post, Put, Redirect, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { encodePassword } from "src/utils/helpers/bcrypt";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request){
        return this.authService.login(req.user);
    }

    @Get('confirmation/:id')
    @Redirect('https://nestjs.com', 301)
    async confirmation(@Param('id') id: number){
        await this.authService.confirmUser(id ,{
            isValidate: true
        })
    }

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const hashedPassword = await encodePassword(password);

        const user = await this.authService.register({
            name,
            email,
            password: hashedPassword
        });

        delete user.password;

        return user;
    }
}