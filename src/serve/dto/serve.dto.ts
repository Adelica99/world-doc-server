import { IsNumber, IsString } from "class-validator";

export class ServeDto {
    @IsString()
    name: string

    @IsNumber()
    price: number
}