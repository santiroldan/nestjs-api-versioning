import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, VersioningType} from '@nestjs/common';
import {AppCustomModule} from '../../src/modules/app-custom.module';

describe('API Custom Versioning (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppCustomModule],
        }).compile();

        app = module.createNestApplication();
        app.enableVersioning({
            type: VersioningType.CUSTOM,
            extractor: (req: any) =>
                req.headers['x-custom-version'] || req.headers['X-Custom-Version'] || '1',
        });
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/hello-custom?version=1 (GET) should return "Hello from Custom Version V1"', () => {
        return request(app.getHttpServer())
            .get('/hello-custom')
            .set('x-custom-version', '1')
            .expect(200)
            .expect('Hello from Custom Version V1');
    });

    it('/hello-custom?version=2 (GET) should return "Hello from Custom Version V2"', () => {
        return request(app.getHttpServer())
            .get('/hello-custom')
            .set('x-custom-version', '2')
            .expect(200)
            .expect('Hello from Custom Version V2');
    });
});
