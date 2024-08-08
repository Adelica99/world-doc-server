import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DiseaseDto } from './dto/disease.dto';


@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) { }

  create(dto: DiseaseDto) {
    return this.prisma.disease.create({
      data: dto
    })
  }

  findAll() {
    return this.prisma.disease.findMany({
    })
  }

  findOne(diseaseId: string) {
    return this.prisma.disease.findUnique({
      where: {
        id: diseaseId
      }
    })
  }

  update(dto: Partial<DiseaseDto>, diseaseId: string) {
    return this.prisma.disease.update({
      where: {
        id: diseaseId
      },
      data: dto
    })
  }

  remove(diseaseId: string) {
    this.prisma.disease.delete({
      where: {
        id: diseaseId
      }
    })
  }

}
