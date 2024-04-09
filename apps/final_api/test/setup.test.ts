import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

let app: INestApplication;
let server: any;
let adminAccessToken: string = '';
// let studentAccessToken: string = '';
// let teacherAccessToken: string = '';
export const setupTestModel = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
};

export const closeTestModel = async () => {
  await app.close();
};

beforeAll(async () => {
  await setupTestModel();
  server = app.getHttpServer();
  const response = await request(server)
    .post('/admin/login')
    .send({ email: 'admin@gmail.com', password: 'admin' });
  expect(response.body.data).toBeDefined();
  adminAccessToken = response.body.data;
  console.log(response.body);
  console.log('This is accessToken: ', adminAccessToken);
});

afterAll(async () => {
  await closeTestModel();
});

export { server, adminAccessToken };
