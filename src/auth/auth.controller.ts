import { Controller, Body, Post, Get, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequest } from './requests/user-login.request';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/users/user.service';
import { UserEntity } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { createClient } from 'redis';


@Controller('auth')
@ApiTags("Authorize")
export class AuthController 
{
    constructor (private authService: AuthService, private userService: UserService){}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() userRquest: UserLoginRequest)
    {
        return this.authService.login(userRquest);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/profile')
    async getProfile(@Request() req)
    {
        return req.user;
    }
    @UsePipes(new ValidationPipe())
    @Post('/register')
    async register(@Body("user") user: CreateUserDto)
    {
        console.log(`working once`)
        const result = await this.userService.insert(user);
        
        return result.raw.affectedRows > 0 ? 
            { userId : result.identifiers[0].id ,status : 200, description :"Register Successfully"  } 
            : 
            { status : "FALSE ", description : "Register Fail"}; 
    }


    @Post('/logout')
    async logout(@Request() req)
    {
        try {
            const token = req.headers.authorization;
            console.log(token)
            const client = createClient();
            client.set(token,"true",(data)=> {
                console.log(data)
            })
            return {
                status: "200",
                description : "Successfully Logged Out"
            }
        } catch (error) {
            return {
                status: "Fail",
                description : "Request To Log Out Fail"
            }
        }
        
        
    }
}
