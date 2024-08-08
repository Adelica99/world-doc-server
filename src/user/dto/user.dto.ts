import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator"
import { Sex } from "@prisma/client"
import { Transform } from "class-transformer"

export class UserDto {
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @MinLength(8, {
        message: 'Password must be at least 8 characters leter'
    })
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    secondName: string

    @IsOptional()
    @IsString()
    phoneNumber: string

    @IsOptional()
    @IsString()
    country: string

    @IsOptional()
    @IsDateString()
    birthDate: string

    @IsOptional()
    @IsEnum(Sex)
    @Transform(({ value }) => ('' + value).toLowerCase())
    biologicalSex: Sex

}