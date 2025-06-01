import {Module} from '@nestjs/common';
import {HelloMediaTypeController} from '../controllers/hello-mediatype.controller';

@Module({
    controllers: [HelloMediaTypeController],
})
export class AppMediaTypeModule {
}
