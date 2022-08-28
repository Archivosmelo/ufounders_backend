import { IsBoolean, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateClientDto {

    @IsInt()
    @Min(0)
    ticket: number;

    @IsBoolean()
    present: boolean;

    @IsString()
    @MinLength(1)
    firstName: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsString()
    @MinLength(1)
    birthdate: string;

    @IsString()
    @MinLength(1)
    email: string;

    @IsString()
    @MinLength(1)
    phone: string;

    @IsString()
    @MinLength(1)
    address: string;

}
