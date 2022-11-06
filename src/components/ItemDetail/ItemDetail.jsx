import React from "react";
import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


const ItemDetail = ({ item }) => {
  const {id, title, description, price, url, stock, kg } = item;

  const {addItem } = useContext(CartContext)
  
  function onAdd(count) {
    const productToAdd = {
      id, title, price, url, count
      
    }

    addItem(productToAdd)
  }

  return (
    <div className="detailWrapper">
      <div className="detailLeft">
        <div><img className="detailImg" src={url} alt="" /></div>
        <span className="descr">Descripción: </span>
        <span className="descr1">{description}</span>
      </div>

      <div className="detailInfoWr">
        <h1 className="titulo"><span>{title}</span></h1>
        <h2 className="kg">KG: <span className="span">{kg}</span> </h2>
        <h2 className="precio">precio: <span className="span">{price}</span></h2>
        <h3 className="stock">Stock: <span className="span">{stock}</span> </h3>
        {<ItemCount stock={stock} initial={1} onAdd = {onAdd} />}
      </div>
    </div>
  );
};

export default ItemDetail;
