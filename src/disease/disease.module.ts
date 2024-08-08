import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DiseaseController],
  providers: [DiseaseService, PrismaService],
})
export class DiseaseModule { }
