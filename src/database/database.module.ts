import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/recipe/recipe.entity';
import { User } from 'src/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'recipeApp',
            entities: [Recipe, User],//__dirname + '/**/*.entity{.ts,.js}'
            synchronize: true,
        }),
    ]
})
export class DatabaseModule {}
