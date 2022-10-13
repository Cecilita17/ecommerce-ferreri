import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting={"Bienvenidos"} />}
          />
          <Route path="/item/:productId" element={<ItemDetailContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
