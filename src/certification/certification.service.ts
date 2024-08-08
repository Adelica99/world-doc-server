import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ModelUtil } from 'src/utils/model.utils';
import { NotFoundException } from '@nestjs/common';
import { CertificationDto } from './dto/certification.dto';

@Injectable()
export class CertificationService {
  private readonly modelUtil: ModelUtil;

  constructor(private prisma: PrismaService) {
    this.modelUtil = new ModelUtil(prisma);
  }

  prismaService = new PrismaService();

  async checkDoctorExists(dto: CertificationDto, model: string) {

    const doctor = await this.modelUtil.checkModelExists(model, dto.doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctors not found');
    }
  }

  async create(dto: CertificationDto) {

    await this.checkDoctorExists(dto, "doctor")

    const certification = {
      university: dto.university,
      faculty: dto.faculty,
      dateStart: dto.dateStart,
      dateEnd: dto.dateEnd,
      verificationStatus: dto.verificationStatus,
      doctor: {
        connect: {
          id: dto.doctorId
        }
      }
    }

    return this.prisma.certification.create({
      data: certification
    })
  }

  findAll() {
    return this.prisma.certification.findMany({})
  }

  findOne(certificationId: string) {
    return this.prisma.certification.findUnique({
      where: {
        id: certificationId
      }
    });
  }

  update(certificationId: string, dto: Partial<CertificationDto>) {
    return this.prisma.certification.update({
      where: {
        id: certificationId,
        doctorId: dto.doctorId
      },
      data: dto
    });
  }

  remove(certificationId: string) {
    return this.prisma.certification.delete({
      where: {
        id: certificationId
      }
    });
  }
}
