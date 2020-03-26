import { Controller, Body, Post, Get, UseGuards, Request, ValidationPipe, UsePipes, Session, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequest } from './requests/user-login.request';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/users/user.service';
import { UserEntity } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { createClient } from 'redis';
import{ Request as LocalRequest} from 'express';

@Controller('auth')
@ApiTags("Authorize")
export class AuthController 
{
    constructor (private authService: AuthService, private userService: UserService){}
    /**
     * SET SESSION 
     * 
     * @param userRquest 
     * @param request 
     */
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() userRquest: UserLoginRequest,@Request() request)
    {     
        const result = await this.authService.login(userRquest);
        /**
         * IF FAil login process in authService
         */
        if(result == null){
            console.log(`result null`)
        }else{
            /**
             * In this case queryResult 100% has a value because of login once
            
            console.log(`In this case queryResult 100% has a value because of login once`)
            const userResult =await this.userService.findOneByUserObjectWithAnyFields(result.user);
            request.session.user = {
                id : userResult.id,
                username : userResult.username,
                password : userResult.password
            }; */
            request.session.user = result.user
            return result;
        }
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

    /**
     * DONE
     * @param req 
     * Directly request endpoint 
     *   =>     token and user = underfined
     *  only     1          1 = successfully
     * 
     */
    @Post('/logout')
    async logout(@Request() req)
    {
        try {
            const token = req.headers.authorization;
            
            const client = createClient();
            const user = req.session.user;
            
            if(  token == undefined ||  user  == undefined){
               console.log('log out fail')
               throw new HttpException("Logged Out Fail",400)
            }else{
                client.set(token,user.id,(data)=> {
                    console.log(data)
                })
                req.session.user = null;
                return {
                    status: "200",
                    description : "Successfully Logged Out"
                }
            }
           
            
        } catch (error) {
            return {
                status: "Fail",
                description : "Request To Log Out Fail"
            }
        }
        
        
    }


    @Get("/getme")
    getMe(@Request() req,@Session() ses){
        console.log(req.session)
        console.log(ses)
    }
}
