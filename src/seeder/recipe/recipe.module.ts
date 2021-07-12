import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/recipe/recipe.entity';
import { RecipeService } from './recipe.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Recipe])
],
  controllers: [],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
