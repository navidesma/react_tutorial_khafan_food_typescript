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
import EditRestaurant from "@/pages/Restaurant/EditRestaurant/EditRestaurant.tsx";
import Addresses from "@/pages/Addresses/Addresses.tsx";
import ManageAddress from "@/pages/ManageAddress/ManageAddress.tsx";
import CreateEditFood from "@/pages/Restaurant/CreateEditFood/CreateEditFood.tsx";
import Orders from "@/pages/Orders/Orders.tsx";

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
                        <Route path='restaurant/food' element={<CreateEditFood />} />
                        <Route path='restaurant/food/:foodId' element={<CreateEditFood />} />
                        <Route path='restaurant/edit-restaurant' element={<EditRestaurant />} />
                        <Route path='addresses' element={<Addresses />} />
                        <Route path='manage-address/:addressId' element={<ManageAddress />} />
                        <Route path='manage-address' element={<ManageAddress />} />
                        <Route path='orders' element={<Orders />} />
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
