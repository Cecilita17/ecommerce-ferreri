import React from 'react'
import Item from '../Item/Item'

const ItemList = ({products}) => {
  return (
      <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "#e2e4e5", height: "100vh" }}>
          {products.map((item, index) => (
              <Item key={index} id={item.id} title = {item.title} clase = {item.clase} description = {item.description} priceRegular = {item.priceRegular} priceMedium = {item.priceMedium} url = {item.url} />
          ))}
    </div>
  )
}

export default ItemList