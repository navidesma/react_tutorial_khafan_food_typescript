export interface FoodItemType {
    id: number;
    name: string;
    restaurant: string;
    img: string;
    price: number;
}

export interface CartType {
    item: FoodType;
    count: number;
}

export interface NotificationType {
    type: "info" | "error" | "warning" | "success";
    message: string;
}

export enum UserTypeEnum {
    RESTAURANT_OWNER = "RESTAURANT_OWNER",
    NORMAL_USER = "NORMAL_USER",
}

export interface UserType {
    id: number;
    username: string;
    type: UserTypeEnum;
    mobile: string;
    first_name: string;
    last_name: string;
    full_name: string;
    created_at: string;
    updated_at: string;
}

export interface RestaurantType {
    id: number;
    name: string | null;
    owner: number;
    address: number | null;
    created_at: string;
    updated_at: string;
    is_creation_completed: boolean;
}

export interface AddressType {
    id: number;
    latitude: number;
    longitude: number;
    title: string;
    description: string;
    mobile: string;
    created_at: string;
    updated_at: string;
    owner: number;
}

export interface FoodType {
    id: number;
    name: string;
    description: string | null;
    category: number;
    category_name: string;
    sub_category: number;
    sub_category_name: string;
    price: number;
    image: string;
    restaurant: number;
    restaurant_name: string;
    created_at: string;
    updated_at: string;
}

export interface FoodCategoryType {
    id: number;
    name: string;
}

export interface FoodSubCategoryType {
    id: number;
    name: string;
    category: number;
}

export interface PaginatedListType<T> {
    previous: string | null;
    next: string | null;
    count: number;
    results: T[];
}

export interface OrderItemType {
    id: number;
    food: FoodType;
    count: number;
    created_at: string;
}

export interface OrderType {
    id: number;
    items: OrderItemType[];
    shipping_cost: number;
    total_cost: number;
    customer: number;
    address: AddressType;
    deliver_time: string | null;
    is_finished: boolean;
    created_at: string;
}
