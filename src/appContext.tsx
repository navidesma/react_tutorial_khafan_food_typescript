import React, { createContext, useEffect, useState } from "react";
import { CartType, FoodItemType, NotificationType } from "@/interfaces.ts";

export interface AppContextType {
    cart: CartType[];
    addItemToCart: (item: FoodItemType) => void;
    removeItemFromCart: (id: number) => void;
    notification: NotificationType | null;
    toggleNotification: (notification: NotificationType) => void;
    isSignedIn: boolean;
    fullName: string | null;
    userType: "MANAGER" | "NORMAL_USER";
}

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartType[]>([]);

    const [notification, setNotification] = useState<NotificationType | null>(null);

    const fullName = "Navid Esma";
    const userType = "NORMAL_USER";
    const isSignedIn = true;

    useEffect(() => {
        if (notification) {
            const notificationTimeOut = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => clearTimeout(notificationTimeOut);
        }
    }, [notification]);

    const addItemToCart = (item: FoodItemType) => {
        setCart((prevState) => {
            const newState: CartType[] = JSON.parse(JSON.stringify(prevState));

            const itemIndex = newState.findIndex((cart) => cart.item.id === item.id);

            if (itemIndex === -1) newState.push({ item, count: 1 });
            else newState[itemIndex].count += 1;

            return newState;
        });
    };

    const removeItemFromCart = (id: number) => {
        setCart((prevState) => {
            const newState: CartType[] = JSON.parse(JSON.stringify(prevState));

            const item = newState.find((cart) => cart.item.id === id) as CartType;

            if (item.count > 1) {
                item.count -= 1;
            } else return newState.filter((cart) => cart.item.id !== id);

            return newState;
        });
    };
    const toggleNotification = (notification: NotificationType) => {
        setNotification(notification);
    };

    return (
        <AppContext.Provider
            value={{
                cart,
                fullName,
                isSignedIn,
                notification,
                userType,
                addItemToCart,
                removeItemFromCart,
                toggleNotification,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
