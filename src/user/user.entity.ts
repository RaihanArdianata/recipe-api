import { Recipe } from './../recipe/recipe.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Role} from "src/utils/role.enum";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: Role.User})
    role: string

    @Column({default: false})
    isValidate: boolean;

    @OneToMany(type => Recipe, recipe => recipe.id)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe
}
