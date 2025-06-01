import {Module} from '@nestjs/common';
import {HelloV1Controller} from '../controllers/hello-v1.controller';
import {HelloV2Controller} from '../controllers/hello-v2.controller';

@Module({
    controllers: [HelloV1Controller, HelloV2Controller],
})
export class AppUriModule {
}
