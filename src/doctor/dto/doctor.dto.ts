import { IsString, IsBoolean, IsNumber, IsOptional } from "class-validator";

export class DoctorDto {
    @IsString()
    firstName: string

    @IsString()
    secondName: string

    @IsString()
    image: string

    @IsBoolean()
    verificationStatus: boolean

    @IsString()
    country: string

    @IsString()
    speciality: string

    @IsNumber()
    @IsOptional()
    consultations: number

    @IsNumber()
    experianceYears: number

    @IsString()
    about: string

    @IsNumber()
    @IsOptional()
    score: number
}