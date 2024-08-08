import { IsString } from "class-validator";

export class DoctorServeDto {
    @IsString()
    doctorId: string

    @IsString()
    serveId: string
}