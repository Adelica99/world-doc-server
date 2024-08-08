import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DoctorDiseaseDto } from './dto/doctor-disease.dto';
import { ModelUtil } from 'src/utils/model.utils';

@Injectable()
export class DoctorDiseaseService {
  private readonly modelUtil: ModelUtil;

  constructor(private prisma: PrismaService) {
    this.modelUtil = new ModelUtil(prisma);
  }

  prismaService = new PrismaService();

  async checkModelExists(id: string, model: string) {

    const doctor = await this.modelUtil.checkModelExists(model, id);

    if (!doctor) {
      throw new NotFoundException(`${model}s not found`);
    }
  }

  async create(dto: DoctorDiseaseDto) {

    await this.checkModelExists(dto.doctorId, "doctor")

    await this.checkModelExists(dto.diseaseId, "disease")


    return this.prisma.doctorDisease.create({
      data: {
        doctor: {
          connect: {
            id: dto.doctorId
          }
        },
        disease: {
          connect: {
            id: dto.diseaseId
          }
        }
      }
    })
  }

  findAll() {
    return this.prisma.doctorDisease.findMany({})
  }

  findOne(doctorDiseaseId: string) {
    return this.prisma.doctorDisease.findUnique({
      where: {
        id: doctorDiseaseId
      }
    })
  }

  update(dto: DoctorDiseaseDto, doctorDiseaseId: string) {
    return this.prisma.doctorDisease.update({
      where: {
        id: doctorDiseaseId
      },
      data: dto
    })
  }

  remove(doctorDiseaseId: string) {
    return this.prisma.doctorDisease.delete({
      where: {
        id: doctorDiseaseId
      }
    })
  }
}
