
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma.service';

describe('Payment', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PaymentController],
        providers: [PaymentService, PrismaService],
    })
      .compile();

    app = moduleRef.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/POST Payment Register`, () => {
    return request(app.getHttpServer())
      .post('/payment/register')
      .send({
        amount: 20.02,
      })
      .expect(200)
      .expect((res) => expect(res.body.amount == 20.02));
  });

  afterAll(async () => {
    await app.close();
  });
});
