import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CountryModule } from './country/country.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    RecipeModule, 
    CountryModule, 
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
