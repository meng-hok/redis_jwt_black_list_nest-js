import { IsString, IsNotEmpty, IsDefined, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserLoginRequest
{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        type: "string",
        example: "sjdecode",
        description: "The user login of the system"
    })
    username: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    @ApiProperty({
        required: true,
        type: "string",
        example: "sjdecode",
        description: "The password login of the system"
    })
    password: string;
}