import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ChangeBalanceDto } from 'src/features/users/dto/change-balance.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (post)', async () => {
    const changeBalanceDto: ChangeBalanceDto = { amount: -2 };
    const sendBalanceChange = async () => {
      return await request(app.getHttpServer()).post('/users').send(changeBalanceDto);
    };
    const requests = [];
    for (let i = 0; i < 10; i++) requests.push(sendBalanceChange);
    const responses = await Promise.all(
      requests.map(async (request) => {
        const response = await request();
        return { body: response.body, status: response.status };
      }),
    );
    responses.forEach((response) => {
      expect(response.status).toBe(201);
    });
  });
});
