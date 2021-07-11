import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Redirect, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import {JwtService} from "@nestjs/jwt";
import { decodePassword, encodePassword } from 'src/utils/helpers/bcrypt';
import {Response, Request} from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}
}
