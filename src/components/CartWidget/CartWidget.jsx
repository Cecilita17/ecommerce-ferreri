import React from 'react'
import './CartWidget.css'
import cart from '../../assets/cart-shopping-solid.svg'
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom';

const CartWidget = () => {

  const {cdadTotal} = useContext(CartContext)
  return (
    <div className='div'> 
      <Link to={`/cart`}><img src={cart} alt="cart" className='cart' /></Link>
      {cdadTotal}
    </div>
    
  )
}

export default CartWidget