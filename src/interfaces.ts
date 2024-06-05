export interface FoodItemType {
    id: number;
    name: string;
    restaurant: string;
    img: string;
    price: number;
}

export interface CartType {
    item: FoodItemType;
    count: number;
}

export interface NotificationType {
    type: "info" | "error" | "warning" | "success";
    message: string;
}
