import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { RecipeService } from './recipe/recipe.service';
import { UserService } from './user/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly recipeService: RecipeService,
    private readonly UserService: UserService,
  ) {}

  async seed() {
    const users = await this.user()
      .then((completed: []) => {
          this.logger.debug('Successfuly completed seeding users...');
          return completed;
        // Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });

    const recipes = await this.recipe(users)
        .then((completed) => {
            this.logger.debug('Successfuly completed seeding recipe...');
            // Promise.resolve(completed);
        })
        .catch((error) => {
            this.logger.error('Failed seeding recipe...');
            Promise.reject(error);
        });

  }

  async user() {
    return await Promise.all(this.UserService.create())
      .then((createdProduct) => {
        this.logger.debug('user created');
        return createdProduct;
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }

  async recipe(user) {
    return await Promise.all(this.recipeService.create(user[0]))
    .then((createdProduct) => {
        this.logger.debug('user created');
        return createdProduct;
    })
    .catch((error) => {
        console.log(error);
        Promise.reject(error);
    });

  }
}
