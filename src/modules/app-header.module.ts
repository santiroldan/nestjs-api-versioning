import {Module} from '@nestjs/common';
import {HelloHeaderController} from '../controllers/hello-header.controller';

@Module({
    controllers: [HelloHeaderController],
})
export class AppHeaderModule {
}
