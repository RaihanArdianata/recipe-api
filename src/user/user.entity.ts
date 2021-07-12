import { Recipe } from './../recipe/recipe.entity';
import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Role} from "src/utils/enums/role.enum";

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
    role: number

    @Column({default: false})
    isValidate: boolean;

    // @Column({})
    // createdAt: Date;

    // @Column({})
    // deletedAt: Date;

    @OneToMany(type => Recipe, recipe => recipe.user)
    recipe: Recipe[]
}
