import { Module } from '@nestjs/common'
import { ZapiModule } from '../zapi/zapi.module'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [ZapiModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
