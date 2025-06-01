import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, VersioningType} from '@nestjs/common';
import {AppMediaTypeModule} from '../../src/modules/app-mediatype.module';

describe('API Media Type Versioning (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppMediaTypeModule],
        }).compile();

        app = module.createNestApplication();
        app.enableVersioning({
            type: VersioningType.MEDIA_TYPE,
            key: 'v=',
        });
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/hello-media (GET) with Accept: application/json;v=1 should return "Hello from Media-Type V1"', () => {
        return request(app.getHttpServer())
            .get('/hello-media')
            .set('Accept', 'application/json;v=1')
            .expect(200)
            .expect('Hello from Media-Type V1');
    });

    it('/hello-media (GET) with Accept: application/json;v=2 should return "Hello from Media-Type V2"', () => {
        return request(app.getHttpServer())
            .get('/hello-media')
            .set('Accept', 'application/json;v=2')
            .expect(200)
            .expect('Hello from Media-Type V2');
    });
});
