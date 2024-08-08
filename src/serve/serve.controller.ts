import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ServeService } from './serve.service';
import { Auth } from 'src/decorators/auth.decorator';
import { ServeDto } from './dto/serve.dto';


@Controller('service')
export class ServeController {
  constructor(private readonly serveService: ServeService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: ServeDto) {
    return this.serveService.create(dto);
  }

  @Get()
  async findAll() {
    return this.serveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') serveId: string) {
    return this.serveService.findOne(serveId);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') serveId: string, @Body() dto: ServeDto) {
    return this.serveService.update(dto, serveId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') serveId: string) {
    return this.serveService.remove(serveId);
  }
}
