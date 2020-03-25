import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags("Users")
export class UserController 
{
    constructor (private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    async findAll(): Promise<UserEntity[]>
    {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:id')
    async getProfileDetail(@Param("id") id: string): Promise<any>
    {
        return this.userService.findOneById(id);
    }

    @Post('/test')
    async gettest(@Body() user: UserEntity)
    {
        return "test";
    }

}
