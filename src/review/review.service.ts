import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { ModelUtil } from 'src/utils/model.utils';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ReviewService {
  private readonly modelUtil: ModelUtil;

  constructor(private prisma: PrismaService) {
    this.modelUtil = new ModelUtil(prisma);
  }

  prismaService = new PrismaService();

  async checkDoctorExists(dto: ReviewDto, model: string) {

    const doctor = await this.modelUtil.checkModelExists(model, dto.doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctors not found');
    }
  }


  async create(dto: ReviewDto, userId: string) {

    await this.checkDoctorExists(dto, "doctor")

    const review = {
      userFirstName: dto.userFirstName,
      userSecondName: dto.userSecondName,
      date: new Date(dto.date),
      score: dto.score,
      comment: dto.comment,
      doctor: {
        connect: {
          id: dto.doctorId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    }

    return this.prisma.review.create({
      data: review
    })
  }

  findAll() {
    return this.prisma.review.findMany({})
  }

  findOne(reviewId: string) {
    return this.prisma.review.findUnique({
      where: {
        id: reviewId
      }
    });
  }

  update(dto: Partial<ReviewDto>, reviewId: string, userId: string) {
    return this.prisma.review.update({
      where: {
        id: reviewId,
        doctorId: dto.doctorId,
        userId
      },
      data: dto
    });
  }

  remove(reviewId: string) {
    return this.prisma.review.delete({
      where: {
        id: reviewId
      }
    });
  }
}
