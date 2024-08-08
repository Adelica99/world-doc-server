import { IsDateString, IsNumber, IsString } from "class-validator"

export class ReviewDto {

    @IsString()
    doctorId: string

    @IsString()
    userFirstName: string

    @IsString()
    userSecondName: string

    @IsDateString()
    date: string

    @IsNumber()
    score: number

    @IsString()
    comment: string
}