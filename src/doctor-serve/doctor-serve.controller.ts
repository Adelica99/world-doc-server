import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { DoctorServeService } from './doctor-serve.service';
import { DoctorServeDto } from './dto/doctor-serve.dto';


@Controller('doctor-service')
export class DoctorServeController {
  constructor(private readonly doctorServeService: DoctorServeService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: DoctorServeDto) {
    return this.doctorServeService.create(dto);
  }

  @Get()
  findAll() {
    return this.doctorServeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') doctorServeId: string) {
    return this.doctorServeService.findOne(doctorServeId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') doctorServeId: string, @Body() dto: DoctorServeDto) {
    return this.doctorServeService.update(dto, doctorServeId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') doctorServeId: string) {
    return this.doctorServeService.remove(doctorServeId);
  }
}
