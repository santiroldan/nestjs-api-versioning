import {Controller, Get} from '@nestjs/common';

@Controller({path: 'hello', version: '2'})
export class HelloV2Controller {
    @Get()
    getHelloV2() {
        return 'Hello from V2 (URI versioning)';
    }
}
