import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, VersioningType} from '@nestjs/common';
import {AppUriModule} from '../../src/modules/app-uri.module';

describe('API URI Versioning (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppUriModule],
        }).compile();

        app = module.createNestApplication();
        app.enableVersioning({
            type: VersioningType.URI,
        });
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/v1/hello (GET) should return "Hello from V1 (URI versioning)"', () => {
        return request(app.getHttpServer())
            .get('/v1/hello')
            .expect(200)
            .expect('Hello from V1 (URI versioning)');
    });

    it('/v2/hello (GET) should return "Hello from V2 (URI versioning)"', () => {
        return request(app.getHttpServer())
            .get('/v2/hello')
            .expect(200)
            .expect('Hello from V2 (URI versioning)');
    });
});
