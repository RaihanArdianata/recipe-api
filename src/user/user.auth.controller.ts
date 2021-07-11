import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Redirect, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import {JwtService} from "@nestjs/jwt";
import { decodePassword, encodePassword } from 'src/utils/helpers/bcrypt';
import {Response, Request} from 'express';

@Controller('auth')
export class AuthUserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}
    
    @Get('confirmation/:id')
    @Redirect('https://nestjs.com', 301)
    async confirmation(@Param('id') id: number){
        await this.userService.update(id ,{
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

        const user = await this.userService.create({
            name,
            email,
            password: hashedPassword
        });

        delete user.password;

        return user;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({email});
        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await decodePassword(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});
        delete user.password;
        return {
            success : true,
            message : "success login",
            data   : {
                ...user
            }
        };
    }

    
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');
        
        return {
            message: 'success'
        }
    }

    @Get()
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            
            const data = await this.jwtService.verifyAsync(cookie);
            console.log(data);
            
            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findOne({id: data['id']});

            const {password, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
