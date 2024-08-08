import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { DoctorDiseaseService } from './doctor-disease.service';
import { DoctorDiseaseDto } from './dto/doctor-disease.dto';
import { Auth } from 'src/decorators/auth.decorator';



@Controller('disease-doctor')
export class DoctorDiseaseController {
  constructor(private readonly doctorDiseaseService: DoctorDiseaseService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: DoctorDiseaseDto) {
    return this.doctorDiseaseService.create(dto);
  }

  @Get()
  findAll() {
    return this.doctorDiseaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') educationId: string) {
    return this.doctorDiseaseService.findOne(educationId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') doctorDiseaseId: string, @Body() dto: DoctorDiseaseDto) {
    return this.doctorDiseaseService.update(dto, doctorDiseaseId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') doctorDiseaseId: string) {
    return this.doctorDiseaseService.remove(doctorDiseaseId);
  }
}
