import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './appointment/appointment.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { CertificationModule } from './certification/certification.module';
import { ReviewModule } from './review/review.module';
import { DiseaseModule } from './disease/disease.module';
import { DiseaseDoctorModule } from './doctor-disease/doctor-disease.module';
import { ServeModule } from './serve/serve.module';
import { DoctorServeModule } from './doctor-serve/doctor-serve.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, DoctorModule, AppointmentModule, ExperienceModule, EducationModule, CertificationModule, ReviewModule, DiseaseModule, DiseaseDoctorModule, ServeModule, DoctorServeModule],
})
export class AppModule { }
