import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import ShoppingCart from "@/pages/ShoppingCart/ShoppingCart.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import Payment from "@/pages/Payment/Payment.tsx";
import { AppContext, AppContextType } from "@/appContext.tsx";
import Notification from "@/components/Notification/Notification.tsx";

function App() {
    const { notification } = React.useContext(AppContext) as AppContextType;

    return (
        <>
            <Routes>
                <Route path='home' element={<Home />} />
                <Route path='shopping-cart' element={<ShoppingCart />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='payment' element={<Payment />} />
                <Route path='' element={<Home />} />
                <Route path='*' element={<Navigate to={"home"} />} />
            </Routes>
            {notification && <Notification {...notification} />}
        </>
    );
}

export default App;
