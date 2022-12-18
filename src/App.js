import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./components/Cart/Checkout";
import {Footer } from "./components/Footer/Footer";
import  Login  from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer greeting={"Bienvenidos"} />}
            />
            <Route path="/item/:productId" element={<ItemDetailContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<EditProfile/>} />
          </Routes>
          <Footer />
          </AuthProvider>
          </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
