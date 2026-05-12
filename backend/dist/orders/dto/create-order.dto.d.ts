export declare class OrderItemDto {
    id: string;
    name: string;
    price: number;
    qty: number;
    obs?: string;
}
export declare class CreateOrderDto {
    name: string;
    phone: string;
    deliveryType: string;
    address?: string;
    payment: string;
    change?: string;
    items: OrderItemDto[];
}
