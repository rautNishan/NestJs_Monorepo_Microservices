import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../apps/final_api/src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
describe('Admin Controller Test', () => {
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

  it('Should Throw Unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/register-student')
      .send({});

    expect(response.status).toBe(401);
  });
});
