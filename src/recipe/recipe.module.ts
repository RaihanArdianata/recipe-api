import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/utils/role/guard/roles.guard';
import { RecipeController } from './recipe.controller';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Module({
  imports:[
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forFeature([Recipe]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [RecipeController],
  providers: [
    RecipeService,
    // {provide: APP_GUARD, useClass: RolesGuard,},
  ]
})
export class RecipeModule {}
