import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { AdminGuard } from '../auth/admin.guard'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  findAll() {
    return this.products.findAll()
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto)
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.products.remove(id)
  }
}
