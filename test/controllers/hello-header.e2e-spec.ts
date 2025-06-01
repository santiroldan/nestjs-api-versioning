import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, VersioningType} from '@nestjs/common';
import {AppHeaderModule} from '../../src/modules/app-header.module';

describe('API Header Versioning (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppHeaderModule],
        }).compile();

        app = module.createNestApplication();
        app.enableVersioning({
            type: VersioningType.HEADER,
            header: 'X-API-Version',
        });
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/hello-header (GET) with X-API-Version:1 should return "Hello from Header V1"', () => {
        return request(app.getHttpServer())
            .get('/hello-header')
            .set('X-API-Version', '1')
            .expect(200)
            .expect('Hello from Header V1');
    });

    it('/hello-header (GET) with X-API-Version:2 should return "Hello from Header V2"', () => {
        return request(app.getHttpServer())
            .get('/hello-header')
            .set('X-API-Version', '2')
            .expect(200)
            .expect('Hello from Header V2');
    });
});
