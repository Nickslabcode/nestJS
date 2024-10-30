import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import { App } from 'supertest/types';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    // Start the app
    app = await bootstrapNestApplication();

    // Get the config
    config = app.get<ConfigService>(ConfigService);

    // Get the server endpoint
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  // it.todo('/users - Endpoint is public');
  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  // it.todo('/users - firstName is mandatory');
  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  // it.todo('/users - email is mandatory');
  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  // it.todo('/users - password is mandatory');
  it('/users - firstName is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  // it.todo('/users - Valid request successfully creates user');
  it('/users - Valid request successfully creates user', () => {
    return request(httpServer).post('/users').send(completeUser).expect(201);
  });

  // it.todo('/users - password is not returned in response');
  it('/users - password is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });

  // it.todo('/users - googleId is not returned in response');
  it('/users - password is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.googleId).toBeUndefined();
      });
  });
});
