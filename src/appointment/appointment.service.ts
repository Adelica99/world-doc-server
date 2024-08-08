import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';
import { PrismaService } from 'src/prisma.service';
import { ConsultationStatus, ConsultationType } from '@prisma/client';
import { ModelUtil } from 'src/utils/model.utils';

@Injectable()
export class AppointmentService {
  private readonly modelUtil: ModelUtil;

  constructor(private prisma: PrismaService) {
    this.modelUtil = new ModelUtil(prisma);
  }

  prismaService = new PrismaService();

  async checkDoctorExists(dto: AppointmentDto, model: string) {

    const doctor = await this.modelUtil.checkModelExists(model, dto.doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctors not found');
    }
  }

  async create(dto: AppointmentDto, userId: string) {
    const ConsultationTypeTransform = dto.type?.toUpperCase() as keyof typeof ConsultationType;
    const ConsultationStatusTransform = dto.status?.toUpperCase() as keyof typeof ConsultationStatus;

    await this.checkDoctorExists(dto, "doctor")

    const appointment = {
      userFirstName: dto.userFirstName,
      userSecondName: dto.userSecondName,
      doctorFirstName: dto.doctorFirstName,
      doctorSecondName: dto.doctorSecondName,
      date: new Date(dto.date),
      timeStart: new Date(dto.timeStart),
      timeEnd: new Date(dto.timeEnd),
      address: dto.address,
      price: dto.price,
      type: ConsultationType[ConsultationTypeTransform],
      status: ConsultationStatus[ConsultationStatusTransform],
      user: {
        connect: {
          id: userId
        }
      },
      doctor: {
        connect: {
          id: dto.doctorId
        }
      }
    }

    return this.prisma.appointment.create({
      data: appointment
    });
  }

  async getAll() {
    return this.prisma.appointment.findMany({
    })
  }

  async update(dto: Partial<AppointmentDto>, appointmentId: string, userId: string) {
    return this.prisma.appointment.update({
      where: {
        userId,
        doctorId: dto.doctorId,
        id: appointmentId
      },
      data: dto
    })
  }

  async findOne(appointmentId: string) {
    return this.prisma.appointment.findUnique({
      where: {
        id: appointmentId
      }
    });
  }


  async remove(appointmentId: string) {
    return this.prisma.appointment.delete({
      where: {
        id: appointmentId
      }
    })
  }
}
