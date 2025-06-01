import { Controller, Get, Version } from '@nestjs/common';

@Controller('hello-media')
export class HelloMediaTypeController {
    @Get()
    @Version('1')
    getV1() {
        return 'Hello from Media-Type V1';
    }

    @Get()
    @Version('2')
    getV2() {
        return 'Hello from Media-Type V2';
    }
}
