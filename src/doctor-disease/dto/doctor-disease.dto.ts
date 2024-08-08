import { IsString } from "class-validator";

export class DoctorDiseaseDto {
    @IsString()
    diseaseId: string

    @IsString()
    doctorId: string
}