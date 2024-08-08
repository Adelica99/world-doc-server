import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(@Body() dto: ReviewDto, @CurrentUser('id') userId: string) {
    return this.reviewService.create(dto, userId);
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(@Param('id') id: string, @Body() dto: ReviewDto, @CurrentUser('id') userId: string) {
    return this.reviewService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
