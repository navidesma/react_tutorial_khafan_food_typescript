import React, { createContext, useEffect, useState } from "react";
import { CartType, FoodItemType, NotificationType, UserTypeEnum } from "@/interfaces.ts";

interface UserInfoType {
    fullName: string;
    type: UserTypeEnum;
}

export interface AppContextType {
    cart: CartType[];
    addItemToCart: (item: FoodItemType) => void;
    removeItemFromCart: (id: number) => void;
    clearCart: () => void;
    notification: NotificationType | null;
    toggleNotification: (notification: NotificationType) => void;
    isSignedIn: boolean;
    userInfo: UserInfoType | null;
    token: string | null;
    signIn: (token: string, userInfo: UserInfoType) => void;
    clearAuth: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [cart, setCart] = useState<CartType[]>([]);

    const [notification, setNotification] = useState<NotificationType | null>(null);

    const userInfoText = localStorage.getItem("userInfo");

    const [userInfo, setUserInfo] = useState<UserInfoType | null>(
        userInfoText ? JSON.parse(userInfoText) : null,
    );

    const isSignedIn = !!token;

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

    const clearCart = () => {
        setCart([]);
    };

    const toggleNotification = (notification: NotificationType) => {
        setNotification(notification);
    };

    const clearAuth = () => {
        setToken(null);
        localStorage.clear();
    };

    const signIn = (token: string, userInfo: UserInfoType) => {
        setToken(token);
        localStorage.setItem("token", token);

        setUserInfo(userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    };

    return (
        <AppContext.Provider
            value={{
                cart,
                userInfo,
                isSignedIn,
                notification,
                addItemToCart,
                removeItemFromCart,
                toggleNotification,
                clearCart,
                token,
                clearAuth,
                signIn,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
