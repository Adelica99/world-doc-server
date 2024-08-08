import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CertificationDto } from './dto/certification.dto';
import { CertificationService } from './certification.service';

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: CertificationDto) {
    return this.certificationService.create(dto);
  }

  @Get()
  findAll() {
    return this.certificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') certificationId: string) {
    return this.certificationService.findOne(certificationId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') certificationId: string, @Body() dto: CertificationDto) {
    return this.certificationService.update(certificationId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') certificationId: string) {
    return this.certificationService.remove(certificationId);
  }
}
