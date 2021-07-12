import { User } from 'src/user/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  })
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
