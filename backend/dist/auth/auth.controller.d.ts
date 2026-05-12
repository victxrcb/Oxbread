import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private config;
    constructor(config: ConfigService);
    login(body: {
        password: string;
    }): {
        token: any;
    };
}
