import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Recipe]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
