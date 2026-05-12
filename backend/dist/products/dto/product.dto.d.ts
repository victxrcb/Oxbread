export declare class CreateProductDto {
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    popular?: boolean;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    image?: string;
    popular?: boolean;
}
