import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";
import Trash from '../../assets/trash-icon.svg'


const Cart = () => {
  const { cart, removeItem, precioTotal } = useContext(CartContext);
  console.log(cart);
  console.log(precioTotal);

  return (
    <div>
      {cart.length === 0 ? (
        <div className="vacioWrapper">
          <li className="vacio">El carrito está vacío</li>
          <Link to={`/category/perros`}>
            <button className="btn-carrito">Volver atrás</button>{" "}
          </Link>
        </div>
      ) : (
        <div className="cartWrapper">
          <h1>Tu carrito:</h1>

          <div className="divCartView">
            <div className="map">
              {cart.map((item, index) => (
                <ul className="ulMap">
                  <img
                    src={item.url}
                    style={{ width: "200px" }}
                    alt="imagen de comida de animales"
                  />
                  <div className="divLi">
                    <li key={index}>{item.title}</li>
                    <li>Precio: ${item.price}</li>
                    <li>Cantidad: {item.count}</li>
                    <button style={{border:"none", backgroundColor:"white", padding:"0px"}} > Eliminar: 
                      <img src={Trash} style={{width:"20px", color:"red", marginLeft:"5px"}} onClick={() => removeItem(item.id)}></img>
                    </button>
                    
                  </div>
                </ul>
              ))}
            </div>

            <div className="map">
              <p>total: ${precioTotal}</p>
              <Link to={`/checkout`}>
                <button className="btn-carrito">Comprar</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
