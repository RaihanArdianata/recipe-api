import { IRecipe } from './recipe.interface';
const faker = require('faker')

export const RecipeSeed: IRecipe[] = [
  { title: faker.name.findName(), image: faker.image.imageUrl(), content: faker.lorem.text() },
];