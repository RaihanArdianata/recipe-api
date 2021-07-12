import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { decodePassword } from 'src/utils/helpers/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService:JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
        const user = await this.usersService.findOne({email});
        
        if (await decodePassword(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null
    } catch (error) {
        
        return null;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async confirmUser(id: any, data: any){
    return this.usersService.update(id, data)
  }


  async register(data: any){
    return this.usersService.create(data)
  }
}