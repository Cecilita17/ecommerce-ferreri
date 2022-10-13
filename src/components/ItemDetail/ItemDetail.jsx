import React from "react";
import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ item }) => {
  const { title, description, price, url, stock, kg } = item;

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
        {<ItemCount stock={stock} initial={1} />}
      </div>
    </div>
  );
};

export default ItemDetail;
