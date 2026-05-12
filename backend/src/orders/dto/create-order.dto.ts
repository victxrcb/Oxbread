import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

export class OrderItemDto {
  @IsString() @IsNotEmpty() id: string
  @IsString() @IsNotEmpty() name: string
  @IsNumber() price: number
  @IsNumber() qty: number
  @IsOptional() @IsString() obs?: string
}

export class CreateOrderDto {
  @IsString() @IsNotEmpty() name: string
  @IsString() @IsNotEmpty() phone: string

  @IsIn(['delivery', 'pickup']) deliveryType: string
  @IsOptional() @IsString() address?: string

  @IsIn(['pix', 'card', 'cash']) payment: string
  @IsOptional() @IsString() change?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}
