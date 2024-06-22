import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import ShoppingCart from "@/pages/ShoppingCart/ShoppingCart.tsx";
import SignUp from "@/pages/SignUp/SignUp.tsx";
import Payment from "@/pages/Payment/Payment.tsx";
import { AppContext, AppContextType } from "@/appContext.tsx";
import Notification from "@/components/Notification/Notification.tsx";
import SignIn from "@/pages/SignIn/SignIn.tsx";
import Restaurant from "@/pages/Restaurant/Restaurant.tsx";
import RestaurantInfo from "@/pages/Restaurant/components/RestaurantInfo/RestaurantInfo.tsx";
import ManageAddresses from "@/pages/ManageAddresses/ManageAddresses.tsx";
import ManageAddress from "@/pages/ManageAddress/ManageAddress.tsx";

function App() {
    const { notification, isSignedIn } = React.useContext(AppContext) as AppContextType;

    return (
        <>
            <Routes>
                {isSignedIn && (
                    <>
                        <Route path='home' element={<Home />} />
                        <Route path='shopping-cart' element={<ShoppingCart />} />
                        <Route path='payment' element={<Payment />} />
                        <Route path='restaurant' element={<Restaurant />} />
                        <Route path='restaurant/edit-restaurant' element={<RestaurantInfo />} />
                        <Route path='manage-addresses' element={<ManageAddresses />} />
                        <Route path='manage-address/:addressId' element={<ManageAddress />} />
                        <Route path='manage-address' element={<ManageAddress />} />
                        <Route path='' element={<Home />} />{" "}
                        <Route path='*' element={<Navigate to={"home"} />} />
                    </>
                )}
                {!isSignedIn && (
                    <>
                        <Route path='sign-up' element={<SignUp />} />
                        <Route path='sign-in' element={<SignIn />} />
                        <Route path='*' element={<Navigate to={"sign-in"} />} />
                    </>
                )}
            </Routes>
            {notification && <Notification {...notification} />}
        </>
    );
}

export default App;
