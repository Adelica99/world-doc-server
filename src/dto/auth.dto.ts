import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator"
import { Transform } from "class-transformer"
import { Sex } from "@prisma/client"

export class AuthDto {
    @IsEmail()
    email: string

    @MinLength(8, {
        message: 'Password must be at least 8 characters leter'
    })
    @IsString()
    password: string

    @IsString()
    firstName: string

    @IsString()
    secondName: string

    @IsString()
    phoneNumber: string

    @IsString()
    country: string

    @IsDateString()
    birthDate: string

    @IsOptional()
    @Transform(({ value }) => ('' + value).toUpperCase())
    @IsEnum(Sex)
    biologicalSex: Sex

}