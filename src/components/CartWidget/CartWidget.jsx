import React from 'react'
import './CartWidget.css'

const CartWidget = ({icon}) => {
  return (
    <div className='div' >
        <i className={icon}  ></i>
    </div>
  )
}

export default CartWidget