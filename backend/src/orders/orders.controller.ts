import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Post()
  @HttpCode(200)
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create(dto)
  }
}
