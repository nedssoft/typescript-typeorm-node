import { createConnection, getManager, Connection } from 'typeorm';
import * as request from 'supertest';
import server from '../server';
import { User } from '../database/entities/User';
import connectionOptions from '../database/connectionOptions';
import { generateToken } from '../helpers/jwt';

import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_NOT_FOUND,
} from '../helpers/httpStatusCode';

let connection: Connection;
let authorizationToken: string;
beforeAll(async () => {
  connection = await createConnection();
  console.log('connection')
  const newUser = new User();
  newUser.firstName = 'test';
  newUser.lastName = 'test2';
  newUser.email = 'testuser@test.com';
  newUser.password = 'password';
  const user = await getManager().save(newUser);
  authorizationToken = await generateToken({ id: user.id });
});

// afterAll(async () => {
//   await connection.close();
// });

describe('Posts Endpoints', () => {
  it('should fail user is not authorized', async () => {
    const postData = { title: 'test title', body: 'test body' };
    const res = await request(server).post('/api/posts').send(postData);
    expect(res.statusCode).toEqual(HTTP_UNAUTHORIZED);
    expect(res.body).toHaveProperty('error');
  });
  it('should fail if validation fails', async () => {
    const postData = { title: 'test title' };
    const res = await request(server)
      .post('/api/posts')
      .set('Authorization', authorizationToken)
      .send(postData);
    expect(res.statusCode).toEqual(HTTP_BAD_REQUEST);
    expect(res.body).toHaveProperty('error');
  });

  it('should create a post', async () => {
    const postData = { title: 'test title', body: 'test body' };
    const res = await request(server)
      .post('/api/posts')
      .set('Authorization', authorizationToken)
      .send(postData);
    expect(res.statusCode).toEqual(HTTP_CREATED);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data[0]).toHaveProperty('createdAt');
  });

  /**
   * Note this suite depends on the preceding suite for postId
   */
  it('should update a post', async () => {
    const postData = { title: 'update title' };
    const res = await request(server)
      .patch('/api/posts/1')
      .set('Authorization', authorizationToken)
      .send(postData);
    expect(res.statusCode).toEqual(HTTP_OK);
    expect(res.body).toHaveProperty('data');
  });

  it('should get all posts', async () => {
    const res = await request(server).get('/api/posts');
    expect(res.statusCode).toEqual(HTTP_OK);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(1);
  });

  it('should delete a post', async () => {
    const res = await request(server)
      .delete('/api/posts/1')
      .set('Authorization', authorizationToken);
    expect(res.statusCode).toEqual(HTTP_OK);
  });

  it('should respond with 404 if post does not exist', async () => {
    const res = await request(server).get('/api/posts/2');
    expect(res.statusCode).toEqual(HTTP_NOT_FOUND);
  });
});
