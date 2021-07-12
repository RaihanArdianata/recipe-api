import { User } from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendEmail } from 'src/utils/helpers/send.email';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async create(data: any): Promise<any>{
        try {
            const userExit = await this.userRepository.findOne({where: { email: data.email },});
            if (userExit) {
                return [
                    {
                    path: 'email',
                    message: 'invalid email or emai already in use',
                    },
                ];
            }
            const user = await this.userRepository.save(data);
            await sendEmail(data.email, user.id)

            return user
        } catch (error) {
            return error
        }
    }

    async update(id: number, data: any): Promise<any>{
        return this.userRepository.update(id, data)
    }

    async delete(id: number): Promise<any>{
        return this.userRepository.delete(id)
    }

    async findOne(condition: any): Promise<User>{
        return this.userRepository.findOne(condition);
    }

    async findAll(): Promise<User[]>{
        return this.userRepository.find({relations : ['recipe']})
    }
}
