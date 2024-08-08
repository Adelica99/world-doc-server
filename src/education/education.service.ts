import { Injectable, NotFoundException } from '@nestjs/common';
import { EducationDto } from './dto/education.dto';
import { PrismaService } from 'src/prisma.service';
import { ModelUtil } from 'src/utils/model.utils';

@Injectable()
export class EducationService {
  private readonly modelUtil: ModelUtil;

  constructor(private prisma: PrismaService) {
    this.modelUtil = new ModelUtil(prisma);
  }

  prismaService = new PrismaService();

  async checkDoctorExists(dto: EducationDto, model: string) {

    const doctor = await this.modelUtil.checkModelExists(model, dto.doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctors not found');
    }
  }

  async create(dto: EducationDto) {

    await this.checkDoctorExists(dto, "doctors")

    const education = {
      university: dto.university,
      faculty: dto.faculty,
      dateStart: new Date(dto.dateStart),
      dateEnd: new Date(dto.dateEnd),
      verificationStatus: dto.verificationStatus,
      doctor: {
        connect: {
          id: dto.doctorId
        }
      }
    }

    return this.prisma.education.create({
      data: education
    })
  }

  findAll() {
    return this.prisma.education.findMany({})
  }

  findOne(educationId: string) {
    return this.prisma.education.findUnique({
      where: {
        id: educationId
      }
    });
  }

  update(educationId: string, dto: Partial<EducationDto>) {
    return this.prisma.education.update({
      where: {
        id: educationId,
        doctorId: dto.doctorId
      },
      data: dto
    });
  }

  remove(educationId: string) {
    return this.prisma.education.delete({
      where: {
        id: educationId
      }
    });
  }
}
