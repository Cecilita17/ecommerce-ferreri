import React from 'react'
import Item from '../Item/Item'
import './ItemList.css';

const ItemList = ({products}) => {
  return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
          {products.map((item, index) => (
              <Item key={index} id={item.id} title = {item.title} clase = {item.clase} description = {item.description} priceRegular = {item.priceRegular} priceMedium = {item.priceMedium} url = {item.url} />
          ))}
    </div>
  )
}

export default ItemList