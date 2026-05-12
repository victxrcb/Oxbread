import { ConfigService } from '@nestjs/config';
export declare class ZapiService {
    private config;
    private readonly logger;
    private readonly baseUrl;
    private readonly clientToken;
    private readonly restaurantPhone;
    constructor(config: ConfigService);
    sendText(message: string): Promise<void>;
}
