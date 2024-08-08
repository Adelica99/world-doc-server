import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { Sex } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create(dto: AuthDto) {
    const biologicalSexTransform = dto.biologicalSex?.toUpperCase() as keyof typeof Sex;

    const user = {
      email: dto.email,
      password: await hash(dto.password),
      firstName: dto.firstName,
      secondName: dto.secondName,
      phoneNumber: dto.phoneNumber,
      country: dto.country,
      birthDate: new Date(dto.birthDate),
      biologicalSex: Sex[biologicalSexTransform],

    }

    try {
      return await this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async update(id: string, dto: UserDto) {
    let data = dto

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) }
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        firstName: true,
        secondName: true,
        email: true,
        phoneNumber: true,
        country: true,
        birthDate: true,
        biologicalSex: true
      }
    })
  }
}
