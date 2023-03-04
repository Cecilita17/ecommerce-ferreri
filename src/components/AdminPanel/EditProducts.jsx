import React, { useState } from "react";
import "./EditProducts.css";
import { db } from "../../service/firebase";
import { getDocs, collection } from "firebase/firestore";

const EditProducts = () => {
  const [products, setProducts] = useState([]);

  try {
    const fetchProducts = async () => {
      const collectionRef = collection(db, "products");
      const snapshot = await getDocs(collectionRef);
      const productsArray = [];
      snapshot.forEach((doc) => {
        const productsData = doc.data();
        productsArray.push(productsData);
      });
      setProducts(productsArray);
      console.log("success", productsArray);
    };
    fetchProducts();
  } catch (error) {
    console.log("the error is", error);
  }

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <>
      <h5 className="edit-title">Edit Products</h5>

      <div class="product-table">
        <div class="table-header">
          <div class="product-title">Product</div>
          <div class="product-description">Description</div>
          <div class="product-stock">Stock</div>
          <div class="product-actions">Action</div>
        </div>
        {products.map((product) => (
          <div key={product.id} class="table-row">
            <div class="product-title">{product.title}</div>
            <div class="product-description">{product.description}</div>
            <div class="product-stock">{product.stock}</div>
            <div class="product-actions">
              <button className="button-product-edit" onClick={() => handleEdit(product.id)}>Edit</button>
              <button className="button-product-edit" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditProducts;
