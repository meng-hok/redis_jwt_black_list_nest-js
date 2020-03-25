import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../user.entity';

export class CreateUserDto extends UserEntity{

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly password: string;
}