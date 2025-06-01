import {NestFactory} from '@nestjs/core';
import {VersioningOptions, VersioningType} from '@nestjs/common';
import {AppUriModule} from './modules/app-uri.module';
import {AppHeaderModule} from './modules/app-header.module';
import {AppMediaTypeModule} from './modules/app-mediatype.module';
import {AppCustomModule} from './modules/app-custom.module';

async function bootstrapApp(
    module: any,
    port: number,
    versioningConfig: VersioningOptions | undefined,
    label: string,
) {
    const app = await NestFactory.create(module);
    app.enableVersioning(versioningConfig);
    await app.listen(port);
    console.log(`✅ ${label} versioning server running at http://localhost:${port}`);
}

async function bootstrap() {
    await bootstrapApp(AppUriModule, 3001, {
        type: VersioningType.URI,
    }, 'URI');

    await bootstrapApp(AppHeaderModule, 3002, {
        type: VersioningType.HEADER,
        header: 'X-API-Version',
    }, 'Header');

    await bootstrapApp(AppMediaTypeModule, 3003, {
        type: VersioningType.MEDIA_TYPE,
        key: 'v=',
    }, 'Media-Type');

    await bootstrapApp(AppCustomModule, 3004, {
        type: VersioningType.CUSTOM,
        extractor: (req: any) =>
            req.headers['x-custom-version'] || req.headers['X-Custom-Version'] || '1',
    }, 'Custom');
}

bootstrap().catch((error) => {
    console.error('Error en bootstrap: ', error);
    process.exit(1);
});
