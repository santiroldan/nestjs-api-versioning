import {Controller, Get} from '@nestjs/common';

@Controller({path: 'hello', version: '1'})
export class HelloV1Controller {
    @Get()
    getHelloV1() {
        return 'Hello from V1 (URI versioning)';
    }
}
