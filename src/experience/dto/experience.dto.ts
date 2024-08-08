import { IsString } from "class-validator"

export class ExperienceDto {

    @IsString()
    name: string

    @IsString()
    speciality: string

    @IsString()
    country: string

    @IsString()
    city: string

    @IsString()
    doctorId: string
}