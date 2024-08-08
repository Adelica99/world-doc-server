import { Injectable } from '@nestjs/common';
import { ExperienceDto } from './dto/experience.dto';
import { PrismaService } from 'src/prisma.service';
import { ModelUtil } from 'src/utils/model.utils';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  private readonly modelUtil: ModelUtil;

  constructor(private prisma: PrismaService) {
    this.modelUtil = new ModelUtil(prisma);
  }

  prismaService = new PrismaService();

  async checkDoctorExists(dto: ExperienceDto, model: string) {

    const doctor = await this.modelUtil.checkModelExists(model, dto.doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctors not found');
    }
  }

  async create(dto: ExperienceDto) {
    await this.checkDoctorExists(dto, "doctor")

    const experience = {
      name: dto.name,
      speciality: dto.speciality,
      country: dto.country,
      city: dto.city,
      doctor: {
        connect: {
          id: dto.doctorId
        }
      }
    }

    return this.prisma.experience.create({
      data: experience
    })
  }

  findAll() {
    return this.prisma.experience.findMany({})
  }

  findOne(experienceId: string) {
    return this.prisma.experience.findUnique({
      where: {
        id: experienceId
      }
    });
  }

  update(experienceId: string, dto: Partial<ExperienceDto>) {
    return this.prisma.experience.update({
      where: {
        id: experienceId,
        doctorId: dto.doctorId
      },
      data: dto
    });
  }

  remove(experienceId: string) {
    return this.prisma.experience.delete({
      where: {
        id: experienceId
      }
    });
  }
}
