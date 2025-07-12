
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma.service';
import { prismaService, postgresClient } from '../../test/setup-tests.e2e';

describe('Payment', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PaymentController],
        providers: [PaymentService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/POST Payment Register`, async () => {
    let id;
    await request(app.getHttpServer())
      .post('/payment/register')
      .send({
        amount: 20.02,
      })
      .expect(200)
      .expect((res) => {
        id = res.body.id;
        expect(res.body.amount == 20.02)
      });

      const created = await postgresClient.query(`SELECT * FROM "public"."Payment" where id = ${id}`);
      expect(created.rows[0].amount == 20.02)
  });

  afterAll(async () => {
    await app.close();
  });
});
