import { IsBoolean, IsDateString, IsString } from "class-validator"

export class CertificationDto {
    @IsString()
    doctorId: string

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
}