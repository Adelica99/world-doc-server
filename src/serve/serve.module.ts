import { Module } from '@nestjs/common';
import { ServeService } from './serve.service';
import { ServeController } from './serve.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ServeController],
  providers: [ServeService, PrismaService],
})
export class ServeModule { }
