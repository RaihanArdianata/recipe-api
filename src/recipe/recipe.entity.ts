import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipe')
export class Recipe{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @ManyToOne(type => User, user => user.recipe, {onDelete: 'SET NULL'})
    @JoinColumn()
    user: User
}