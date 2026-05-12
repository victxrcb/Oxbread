import { ZapiService } from '../zapi/zapi.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private zapi;
    constructor(zapi: ZapiService);
    create(dto: CreateOrderDto): Promise<{
        ok: boolean;
    }>;
    private buildMessage;
}
