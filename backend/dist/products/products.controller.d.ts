import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private products;
    constructor(products: ProductsService);
    findAll(): import("./products.service").Product[];
    create(dto: CreateProductDto): import("./products.service").Product;
    update(id: number, dto: UpdateProductDto): import("./products.service").Product;
    remove(id: number): void;
}
