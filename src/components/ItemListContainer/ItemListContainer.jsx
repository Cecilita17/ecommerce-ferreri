import React, { useEffect, useState } from "react";
import Data from "../../stock.json";
import { useParams } from "react-router-dom";
import './ItemListContainer.css'
import ItemList from "../ItemList/ItemList";


const ItemListContainer = (props) => {
  const [products, setProducts] = useState([])
  const { categoryId } = useParams();
  
  useEffect(() => {
    const task = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Data);
      }, 2000);
    });
    task.then((productos) => {
      let productsFiltered = [];
      setProducts(
        productsFiltered = categoryId ? productos.filter((el) => el.category == categoryId) : productos
      );
    });
  }, [categoryId]);
  

  return (
    <>
      <ItemList products={products} />
    </>
  );
};

export default ItemListContainer