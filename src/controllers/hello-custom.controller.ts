import { Controller, Get, Version } from '@nestjs/common';

@Controller('hello-custom')
export class HelloCustomController {
    @Get()
    @Version('1')
    getV1() {
        return 'Hello from Custom Version V1';
    }

    @Get()
    @Version('2')
    getV2() {
        return 'Hello from Custom Version V2';
    }
}
