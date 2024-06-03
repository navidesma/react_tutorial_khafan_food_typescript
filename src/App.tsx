import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import ShoppingCart from "@/pages/ShoppingCart/ShoppingCart.tsx";

function App() {
    return (
        <Routes>
            <Route path='home' key='home' element={<Home />} />
            <Route path='shopping-cart' key='shoppingCart' element={<ShoppingCart />} />
            <Route path='' key='root' element={<Home />} />
            <Route path='*' element={<Navigate to={"home"} />} key={"redirectToHome"} />
        </Routes>
    );
}

export default App;
