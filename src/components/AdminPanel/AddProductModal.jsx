import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../service/firebase";
import "./AddProductModal.css"

const AddProductModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [kg, setKg] = useState("");
  const [url, setUrl] = useState("");

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const productRef = collection(db, "products");
    const newProduct = { title, description, stock, price };
    await addDoc(productRef, newProduct);
    closeModal();
  };

  return (
    <div className="modal-container">
      <h2>Add new product:</h2>
      
      <form className="modal-form" onSubmit={handleAddProduct}>
  <div className="input-group">
    <label htmlFor="title">Title:</label>
    <input type="text" id="title" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
  </div>
  <div className="input-group">
    <label htmlFor="description">Description:</label>
    <input type="text" id="description" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
  </div>
        
  <div className="input-small-group">
    <div className="input-group">
      <label htmlFor="stock">Stock:</label>
      <input type="number" id="stock" placeholder="Stock" value={stock} onChange={(event) => setStock(event.target.value)} />
    </div>
    <div className="input-group">
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" placeholder="$" value={price} onChange={(event) => setPrice(event.target.value)} />
    </div>
    <div className="input-group">
      <label htmlFor="weight">Weight:</label>
      <input type="number" id="weight" placeholder="Kg" value={kg} onChange={(event) => setKg(event.target.value)} />
    </div>
  </div>
        
  <div className="input-group">
    <label htmlFor="url">Image:</label>
    <input type="text" id="url" placeholder="Image url" value={url} onChange={(event) => setUrl(event.target.value)} />
  </div>
  <div className="button-group">
    <button className="button-product-edit" type="submit">Add Product</button>
    <button className="button-product-edit" type="button" onClick={closeModal}>Cancel</button>
  </div>
</form>


    </div>
  );
};

export default AddProductModal;
