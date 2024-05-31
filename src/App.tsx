import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";

function App() {
    return (
        <Routes>
            <Route path='home' key='home' element={<Home />} />
            <Route path='' key='root' element={<Home />} />
            <Route path='*' element={<Navigate to={"home"} />} key={"redirectToHome"} />
        </Routes>
    );
}

export default App;
