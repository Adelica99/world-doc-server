import { ConsultationStatus, ConsultationType } from "@prisma/client";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class AppointmentDto {
    @IsString()
    userFirstName: string

    @IsString()
    userSecondName: string

    @IsString()
    doctorFirstName: string

    @IsString()
    doctorSecondName: string

    @IsDateString()
    date: string

    @IsDateString()
    timeStart: string

    @IsDateString()
    timeEnd: string

    @IsOptional()
    @IsString()
    address?: string

    @IsNumber()
    price: number

    @IsOptional()
    @IsEnum(ConsultationType)
    @Transform(({ value }) => ('' + value).toLowerCase())
    type: ConsultationType

    @IsOptional()
    @IsEnum(ConsultationStatus)
    @Transform(({ value }) => ('' + value).toLowerCase())
    status: ConsultationStatus

    @IsString()
    doctorId: string

}