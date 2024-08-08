import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) { }

  async create(dto: DoctorDto) {
    return this.prisma.doctor.create({
      data: dto
    })
  }

  async getAll() {
    return this.prisma.doctor.findMany({
    })
  }

  async findOne(id: string) {
    return this.prisma.doctor.findUnique({
      where: {
        id
      }
    })
  }

  async update(dto: Partial<DoctorDto>, id: string) {
    return this.prisma.doctor.update({
      where: {
        id,
      },
      data: dto
    })
  }


  async remove(id: string) {
    return this.prisma.doctor.delete({
      where: {
        id
      }
    })
  }
}
