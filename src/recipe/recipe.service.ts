import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>,
        @InjectRepository(Recipe) private readonly userRepository: Repository<User>
    ){

    }

    async create(data: any): Promise<any>{
        return this.recipeRepository.save(data);
    }

    async update(id: number, data: any): Promise<any>{
        return this.recipeRepository.update(id, data)
    }

    async delete(id: number): Promise<any>{
        return this.recipeRepository.delete(id)
    }

    async findOne(condition: any): Promise<Recipe>{
        return this.recipeRepository.findOne(condition,{relations: ['user']});
    }

    async findMyRecipe(user: User): Promise<Recipe[]>{
        return (await this.recipeRepository.find({where: {user: user}, relations: ['user']}));
    }

    async findAll(): Promise<Recipe[]>{
        return this.recipeRepository.find()
    }
}
