import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DoctorServeDto } from './dto/doctor-serve.dto';
import { ModelUtil } from 'src/utils/model.utils';

@Injectable()
export class DoctorServeService {
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

  async create(dto: DoctorServeDto) {
    await this.checkModelExists("doctor", dto.doctorId)

    await this.checkModelExists("serve", dto.serveId)

    return this.prisma.doctorServe.create({
      data: {
        doctor: {
          connect: {
            id: dto.doctorId
          }
        },
        serve: {
          connect: {
            id: dto.serveId
          }
        }
      }
    })
  }

  findAll() {
    return this.prisma.doctorServe.findMany({})
  }

  findOne(doctorServeId: string) {
    return this.prisma.doctorServe.findUnique({
      where: {
        id: doctorServeId
      }
    })
  }

  update(dto: DoctorServeDto, doctorServeId: string) {
    return this.prisma.doctorServe.update({
      where: {
        id: doctorServeId
      },
      data: dto
    })
  }

  remove(doctorServeId: string) {
    return this.prisma.doctorServe.delete({
      where: {
        id: doctorServeId
      }
    })
  }
}
