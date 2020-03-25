import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService 
{
    constructor
    (
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ){}

    async findAll(): Promise<UserEntity[]>
    {
        return await this.userRepository.find();
    }

    public async findOneById(id: string): Promise<UserEntity>
    {
        return await this.userRepository.findOne(id);
    }

    public async findOneByUser(username: string): Promise<UserEntity>
    {
        return await this.userRepository.findOne({"username":username});
    }

    async remove(id: string): Promise<void>
    {
        await this.userRepository.delete(id);
    }
    async insert(user : UserEntity) : Promise<InsertResult>{
        return this.userRepository.insert(user);
    }
}
