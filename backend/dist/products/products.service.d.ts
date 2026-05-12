import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    price: number;
    image: string;
    popular: boolean;
}
export declare class ProductsService {
    private read;
    private write;
    findAll(): Product[];
    create(dto: CreateProductDto): Product;
    update(id: number, dto: UpdateProductDto): Product;
    remove(id: number): void;
}
