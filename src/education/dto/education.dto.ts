import { IsBoolean, IsString, IsDateString } from "class-validator";

export class EducationDto {

    @IsString()
    university: string

    @IsString()
    faculty: string

    @IsDateString()
    dateStart: string

    @IsDateString()
    dateEnd: string

    @IsBoolean()
    verificationStatus: boolean

    @IsString()
    doctorId: string
}