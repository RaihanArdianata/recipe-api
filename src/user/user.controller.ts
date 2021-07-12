import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {JwtService} from "@nestjs/jwt";
import {encodePassword } from 'src/utils/helpers/bcrypt';
import {Request} from 'express';
import { Role } from 'src/utils/enums/role.enum';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('admin')
    async all(
        @Req() request: Request,
    ){
        try {
            const user: any = await request.user
            
            if (user.role !== Role.Admin) {
                throw new UnauthorizedException();
            }

            const result = await this.userService.findAll()

            return {   
                success : true,
                message : "success retrieve data",
                data   : result
            };

        } catch (e) {
            console.log(e);
            
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('myProfile')
    async Myprofile(@Req() request: Request){
        try {
            const user: any = await request.user
            const result = await this.userService.findOne({id: user.id})

            const {password, ...data} = result

            return {   
                success : true,
                message : "success retrieve data",
                data   : data
            }
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('admin')
    async createUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Req() request: Request
    ){
        const user: any = await request.user
            
        if (user.role !== Role.Admin) {
            throw new UnauthorizedException();
        }

        const hashedPassword = await encodePassword(password);

        const createdUser = await this.userService.create({
            name,
            email,
            password: hashedPassword
        });

        delete createdUser.password;

        return {   
            success : true,
            message : "success create user",
            data   : createdUser
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put('admin/:id')
    async updateUser(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Req() request: Request
    ){
        const user: any = await request.user
            
        if (user.role !== Role.Admin) {
            throw new UnauthorizedException();
        }

        const hashedPassword = await encodePassword(password);
        return await this.userService.update(id, {name, email, password: hashedPassword})
    }

    @UseGuards(JwtAuthGuard)
    @Delete('admin/:id')
    async deleteUser(
        @Param('id') id: number,
        @Req() request: Request
        ){
        const user: any = await request.user
        
        if (user.role !== Role.Admin) {
            throw new UnauthorizedException();
        }

        if(user.id == id){
            throw new InternalServerErrorException
        }

        return await this.userService.delete(id)
    }
}
