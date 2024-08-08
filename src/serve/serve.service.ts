import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServeDto } from './dto/serve.dto';

@Injectable()
export class ServeService {
  constructor(private prisma: PrismaService) { }

  create(dto: ServeDto) {
    return this.prisma.serve.create({
      data: dto
    })
  }

  findAll() {
    return this.prisma.serve.findMany({
    })
  }

  findOne(serveId: string) {
    return this.prisma.disease.findUnique({
      where: {
        id: serveId
      }
    })
  }

  update(dto: Partial<ServeDto>, diseaseId: string) {
    return this.prisma.serve.update({
      where: {
        id: diseaseId
      },
      data: dto
    })
  }

  remove(serveId: string) {
    this.prisma.serve.delete({
      where: {
        id: serveId
      }
    })
  }
}
