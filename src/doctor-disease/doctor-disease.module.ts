import { Module } from '@nestjs/common';
import { DoctorDiseaseService } from './doctor-disease.service';
import { DoctorDiseaseController } from './doctor-disease.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DoctorDiseaseController],
  providers: [DoctorDiseaseService, PrismaService],
})
export class DiseaseDoctorModule { }
