import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(1)
    password: string;

}