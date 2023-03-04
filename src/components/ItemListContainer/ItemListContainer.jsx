import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { db } from "../../service/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const ItemListContainer = (props) => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    /*  const collectionRef = collection(db, 'products') */

    const collectionRef =
      categoryId ?
      query(collection(db, "products"), where("category", "==", categoryId)) : collection(db, "products");

    getDocs(collectionRef).then((res) => {
      const productsAdapted = res.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

      setProducts(productsAdapted);
    });


    /* const task = new Promise((resolve) => {
      setTimeout(() => {
        resolve(Data);
      }, 2000);
    });
    task.then((productos) => {
      let productsFiltered = [];
      setProducts(
        productsFiltered = categoryId ? productos.filter((el) => el.category == categoryId) : productos
      );
    }); */
  }, [categoryId]);

  return (
    <>
      <ItemList products={products} />
    </>
  );
};

export default ItemListContainer;
