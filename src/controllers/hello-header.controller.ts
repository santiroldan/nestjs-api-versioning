import { Controller, Get, Version } from '@nestjs/common';

@Controller('hello-header')
export class HelloHeaderController {
    @Get()
    @Version('1')
    getV1() {
        return 'Hello from Header V1';
    }

    @Get()
    @Version('2')
    getV2() {
        return 'Hello from Header V2';
    }
}
