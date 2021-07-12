import { RecipeSeed } from './../data/recipe.data';
import { IRecipe } from './../data/recipe.interface';
import { Recipe } from 'src/recipe/recipe.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  create(user: User): Array<Promise<Recipe>> {
    // return RecipeSeed.map(async (data: IRecipe) => console.log({...data, user}));
    return RecipeSeed.map(async (data: IRecipe) => {
      return this.recipeRepository.save({
        ...data,
        user: user,
      });
    });
  }
}


