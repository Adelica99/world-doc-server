import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, HttpCode, ValidationPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Auth } from 'src/decorators/auth.decorator';
import { DoctorDto } from './dto/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: DoctorDto) {
    return this.doctorService.create(dto);
  }

  @Get()
  async getAll() {
    return this.doctorService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: DoctorDto) {
    return this.doctorService.update(dto, id);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
