import React, { useState } from 'react'
import './ItemCount.css'



const ItemCount = ({ stock, initial, onAdd}) => {
    const [count, setCount] = useState(initial)

    let sumar = () => {
        count < stock && setCount(count+1) 
    }

    let restar = () => {
        count > initial && setCount(count-1)
    }

   

  return (
      <div>
          <div className='divCount'>
            <button className='cdad'>Cantidad: {count}</button>
            <div>
                <button onClick={restar} className='contador' >-</button>
                <button onClick={sumar} className='contador'>+</button>
            </div>
          </div>

          <div className='onAdd'>
        <button onClick={() => onAdd(count)} className='onAddBtn'>Añadir al carrito</button>  
        
          </div>
      </div>
  )
}

export default ItemCount