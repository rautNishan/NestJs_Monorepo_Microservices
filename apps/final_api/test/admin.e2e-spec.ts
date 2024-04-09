import * as request from 'supertest';
import { adminAccessToken, server } from './setup.test';
// let studentId: number;
let teacherId: number;
describe('Admin Controller Test', () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  it('Should Throw Unauthorized', async () => {
    const response = await request(server)
      .post('/admin/register-teacher')
      .send({});
    expect(response.status).toBe(401);
  });

  it('Should login', async () => {
    const response = await request(server)
      .post('/admin/login')
      .send({ email: 'admin@gmail.com', password: 'admin' });
    expect(response.body.data).toBeDefined();
  });

  it('Should Register Teacher', async () => {
    const response = await request(server)
      .post('/admin/register-teacher')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        college_id: 'Test101',
        name: 'Test Teacher',
        section: ['Test Section'],
        email: 'test@gmail.com',
        password: 'test',
        faculty: 'COMPUTING',
      });
    console.log(response.body.data);

    expect(response.body.data).toBeDefined();
    teacherId = response.body.data._id;
    console.log('This is Teacher ID: ', teacherId);
  });

  it('Should Update Teacher by id', async () => {
    const response = await request(server)
      .patch(`/admin/update-teacher/${teacherId}`)
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        college_id: 'Test101',
        name: 'Update Teacher',
        section: ['Test Section'],
        email: 'test@gmail.com',
      });
    console.log('This is Response', response.body);
    expect(response.body.data).toBeDefined();
  });

  it('Should Delete Teacher by id', async () => {
    const response = await request(server)
      .delete(`/admin/delete-teacher/${teacherId}`)
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({});
    expect(response.body.data).toBeDefined();
  });
});
