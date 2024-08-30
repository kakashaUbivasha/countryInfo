import {Routes, Route} from "react-router-dom";
import Home from "../page/Home.jsx";
import Item from "../page/Item.jsx";
const MainRouter = () =>{
    return(
        <Routes>
            <Route index element={<Home/>} />
            <Route path="/item/:id" element={<Item/>} />
        </Routes>
    )
}

export default MainRouter;