import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipe')
export class Recipe{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(type => User, user => user.id)
    user: User
}