import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.prismaService.payment.create({data: createPaymentDto});
      return payment;
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const payment = await this.prismaService.payment.findMany();
      return payment;
    } catch (error) {
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
