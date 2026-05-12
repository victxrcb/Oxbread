import { Injectable, NotFoundException } from '@nestjs/common'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'

const DATA_PATH = join(__dirname, '../../data/products.json')

export interface Product {
  id: number
  category: string
  name: string
  description: string
  price: number
  image: string
  popular: boolean
}

@Injectable()
export class ProductsService {
  private read(): Product[] {
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
  }

  private write(items: Product[]): void {
    writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8')
  }

  findAll(): Product[] {
    return this.read()
  }

  create(dto: CreateProductDto): Product {
    const items = this.read()
    const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
    const item: Product = { id, popular: false, ...dto }
    this.write([...items, item])
    return item
  }

  update(id: number, dto: UpdateProductDto): Product {
    const items = this.read()
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) throw new NotFoundException('Produto não encontrado')
    items[idx] = { ...items[idx], ...dto }
    this.write(items)
    return items[idx]
  }

  remove(id: number): void {
    const items = this.read()
    const filtered = items.filter(i => i.id !== id)
    if (filtered.length === items.length) throw new NotFoundException('Produto não encontrado')
    this.write(filtered)
  }
}
