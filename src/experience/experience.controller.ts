import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Auth } from 'src/decorators/auth.decorator';
import { ExperienceDto } from './dto/experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: ExperienceDto) {
    return this.experienceService.create(dto);
  }

  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') experienceId: string) {
    return this.experienceService.findOne(experienceId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') experienceId: string, @Body() dto: ExperienceDto) {
    return this.experienceService.update(experienceId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') experienceId: string) {
    return this.experienceService.remove(experienceId);
  }
}
