import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { Auth } from 'src/decorators/auth.decorator';
import { DiseaseDto } from './dto/disease.dto';


@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: DiseaseDto) {
    return this.diseaseService.create(dto);
  }

  @Get()
  async findAll() {
    return this.diseaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseaseService.findOne(id);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') id: string, @Body() dto: DiseaseDto) {
    return this.diseaseService.update(dto, id);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.diseaseService.remove(id);
  }
}
