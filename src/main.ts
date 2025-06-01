import {NestFactory} from '@nestjs/core';
import {VersioningType} from '@nestjs/common';
import {AppUriModule} from './modules/app-uri.module';
import {AppHeaderModule} from './modules/app-header.module';
import {AppMediaTypeModule} from './modules/app-mediatype.module';
import {AppCustomModule} from './modules/app-custom.module';

async function bootstrap() {
    const appUri = await NestFactory.create(AppUriModule);
    appUri.enableVersioning({
        type: VersioningType.URI,
    });
    await appUri.listen(3001);
    console.log('✅ URI versioning server running at http://localhost:3001');

    const appHeader = await NestFactory.create(AppHeaderModule);
    appHeader.enableVersioning({
        type: VersioningType.HEADER,
        header: 'X-API-Version',
    });
    await appHeader.listen(3002);
    console.log('✅ Header versioning server running at http://localhost:3002');

    const appMedia = await NestFactory.create(AppMediaTypeModule);
    appMedia.enableVersioning({
        type: VersioningType.MEDIA_TYPE,
        key: 'v='
    });
    await appMedia.listen(3003);
    console.log('✅ Media-Type versioning server running at http://localhost:3003');


    const appCustom = await NestFactory.create(AppCustomModule);
    appCustom.enableVersioning({
        type: VersioningType.CUSTOM,
        extractor: (req: any) =>
            req.headers['x-custom-version'] || req.headers['X-Custom-Version'] || '1',
    });
    await appCustom.listen(3004);
    console.log('✅ Custom versioning server running at http://localhost:3004');
}

bootstrap();
