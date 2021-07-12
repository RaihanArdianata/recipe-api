import { UserSeed } from './../data/user.data';
import { IUser } from './../data/user.interface';
import { User } from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    create(): Array<Promise<User>> {
        return UserSeed.map(async (data: IUser) => {
          return this.userRepository.save(data)
        });
    }
}
