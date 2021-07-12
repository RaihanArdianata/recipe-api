import { Module, Logger } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RecipeModule } from './recipe/recipe.module';
import { Seeder } from './seeder';
import { UserModule } from './user/user.module';

@Module({
    imports:[DatabaseModule, UserModule, RecipeModule],
    providers:[Logger, Seeder]
})
export class SeederModule {}
