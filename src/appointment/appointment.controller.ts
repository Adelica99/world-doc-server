import { Controller, Get, HttpCode, UsePipes, Post, Body, ValidationPipe, Param, Delete, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { AppointmentDto } from './dto/appointment.dto';

@Controller('user/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: AppointmentDto, @CurrentUser('id') userId: string) {
    return this.appointmentService.create(dto, userId);
  }

  @Get()
  @Auth()
  async findAll() {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') id: string, @Body() dto: AppointmentDto, @CurrentUser('id') userId: string) {
    return this.appointmentService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
