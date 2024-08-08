import { IsString } from "class-validator";

export class DiseaseDto {
    @IsString()
    name: string
}