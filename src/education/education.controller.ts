import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EducationService } from './education.service';
import { Auth } from 'src/decorators/auth.decorator';
import { EducationDto } from './dto/education.dto';
import { HttpCode } from '@nestjs/common';


@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: EducationDto) {
    return this.educationService.create(dto);
  }

  @Get()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') educationId: string) {
    return this.educationService.findOne(educationId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') educationId: string, @Body() dto: EducationDto) {
    return this.educationService.update(educationId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') educationId: string) {
    return this.educationService.remove(educationId);
  }
}
