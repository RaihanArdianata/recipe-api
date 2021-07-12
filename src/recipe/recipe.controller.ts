import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, Delete, Param, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import { RecipeService } from './recipe.service';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/role/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/utils/role/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { diskStorage } from 'multer';

@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService, 
        private jwtService: JwtService
    ){}

    @Get()
    async all(){
        return this.recipeService.findAll()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('myRecipe')
    @Roles([Role.Admin, Role.User])
    async myRecipe(@Req() request: Request){
        const user: any = await request.user
        
        const myRecipe =  await this.recipeService.findMyRecipe(user)

        return {   
            success : true,
            message : "success",
            data: myRecipe
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
              destination: './files',
              filename: editFileName,
            }),
            fileFilter: imageFileFilter,
          }),
    )
    @Roles([Role.Admin, Role.User])
    async create(
        @UploadedFile() file,
        @Body('title') title: string,
        @Body('content') content: string,
        @Req() request: Request
    ){
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        
        const user: any = await request.user
        
        const createdRecipe = await this.recipeService.create({
            title,
            content,
            image: response.filename,
            user: user
        });

        return {   
            success : true,
            message : "success create data",
            data: createdRecipe
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
              destination: './files',
              filename: editFileName,
            }),
            fileFilter: imageFileFilter,
          }),
    )
    @Roles([Role.Admin, Role.User])
    async update(
        @UploadedFile() file,
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('content') content: string,
        @Req() request: Request,
    ){
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        const userLogin: any = await request.user
        const {user} = await this.recipeService.findOne({id: id})

        if(user.id == userLogin.id ){ 

            const updatedRecipe = await this.recipeService.update(id, {
                title,
                content,
                image: response.filename,
            })

            return {   
                success : true,
                message : "success update data",
                data: updatedRecipe
            }
        }


        return new UnauthorizedException
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @Roles([Role.Admin, Role.User])
    async delete(
        @Param('id') id: number,
        @Req() request: Request,
    ){
        const userLogin: any = await request.user
        const {user, ...recipe} = await this.recipeService.findOne({id: id})
        const createdUser = await user

        if(createdUser.id == userLogin.id ){ 

            await this.recipeService.delete(id)

            return {   
                success : true,
                message : "success delete data",
            }
        }


        return new UnauthorizedException
    }
}
