import {Module} from '@nestjs/common';
import {HelloCustomController} from '../controllers/hello-custom.controller';

@Module({
    controllers: [HelloCustomController],
})
export class AppCustomModule {
}
