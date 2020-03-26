import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService 
{
    constructor
    (
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    cur_user : UserEntity;
    
    async validateUser(usr: string, pwd: string): Promise<any> 
    {
        const userResults = await this.userService.findOneByUser(usr);
        if (!userResults) {
            throw new NotFoundException('Username not found.');
        }
      
        if (userResults.password !== pwd) {
            throw new BadRequestException('Password is wrong.');
        }

        const { id, password, ...result } = userResults;
        this.cur_user = userResults;
        return result
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            user: this.cur_user,
            access_token: this.jwtService.sign(payload),
        };
      }
}

