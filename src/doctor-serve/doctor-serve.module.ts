import { Module } from '@nestjs/common';
import { DoctorServeController } from './doctor-serve.controller';
import { PrismaService } from 'src/prisma.service';
import { DoctorServeService } from './doctor-serve.service';


@Module({
  controllers: [DoctorServeController],
  providers: [DoctorServeService, PrismaService],
})
export class DoctorServeModule { }
