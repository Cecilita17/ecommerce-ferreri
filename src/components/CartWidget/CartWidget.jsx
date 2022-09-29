import React from 'react'
import './CartWidget.css'
import cart from '../../assets/cart-shopping-solid.svg'

const CartWidget = () => {
  return (
    <div className='div'> 
      <img src={cart} alt="cart" className='cart' />
      0
    </div>
    
  )
}

/* const CartWidget = ({icon}) => {
  return (
    <div className='div' >
        <i className={icon} ></i>
    </div>
  )
} */

export default CartWidget