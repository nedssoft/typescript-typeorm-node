import { createConnection, getManager } from 'typeorm';
import * as request from 'supertest'
import server from '../server'
import { User } from '../database/entities/User'
import connectionOptions from '../database/connectionOptions'
import { HTTP_BAD_REQUEST, HTTP_CREATED,HTTP_OK,HTTP_UNAUTHORIZED } from '../helpers/httpStatusCode';

let connection;
beforeAll( async () => { 
    connection = await createConnection(connectionOptions)
});

afterAll( async () => {
    await connection.close();
});


describe('Auth Endpoints', () => { 

    it('should fail if validation fails', async () => {
        const userData = {
            firstName: 'test',
            email: 'user@example.com',
            password: 'password'
        }
        const res = await request(server).post('/auth/register').send(userData)
        expect(res.statusCode).toEqual(HTTP_BAD_REQUEST)
        expect(res.body).toHaveProperty('error')
    });
    it('should create a new user', async () => {
        const userData = {
            lastName: 'test',
            firstName: 'test',
            email: 'user@example.com',
            password: 'password'
        }
        const res = await request(server).post('/auth/register').send(userData)
        expect(res.statusCode).toEqual(HTTP_CREATED)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('createdAt')
    });

    it('should fail if login credentials are incorrect', async () => {
        const user = new User();
        user.firstName = 'test2',
        user.lastName = 'test22'
        user.email = 'test2@example.com'
        user.password = 'password'
        await getManager().save(user)
        const res = await request(server).post('/auth/login').send({
            email: 'wrong@example.com',
            password: 'password'
        });
        expect(res.statusCode).toEqual(HTTP_UNAUTHORIZED)
        expect(res.body).toHaveProperty('error')

    })

    it('should login if credentials are correct', async () => {
        const user = new User();
        user.firstName = 'test22',
        user.lastName = 'test222'
        user.email = 'test22@example.com'
        user.password = 'password'
        await getManager().save(user)
        const res = await request(server).post('/auth/login').send({
            email: 'test22@example.com',
            password: 'password'
        });
        expect(res.statusCode).toEqual(HTTP_OK)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data[0]).toHaveProperty('token')

    })
});