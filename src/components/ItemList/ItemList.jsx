import React from 'react'
import Item from '../Item/Item'
import "./ItemList.css"

const ItemList = ({products}) => {
  return (
      <div className='divItemList' >
          {products.map((item, index) => (
              <Item key={index} id={item.id} title = {item.title} clase = {item.clase} description = {item.description} priceRegular = {item.priceRegular} priceMedium = {item.priceMedium} url = {item.url} />
          ))}
    </div>
  )
}

export default ItemList