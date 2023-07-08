import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref,  uploadBytes,   } from "firebase/storage";
import { db } from "../../service/firebase";
import "./AddProductModal.css";

const AddProductModal = ({ handleProductAdd, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [kg, setKg] = useState("");
  const [url, setUrl] = useState("");
  const [newProduct, setNewProduct] = useState({
    title,
    description,
    stock,
    price,
    kg,
    url,
  });

  const storage = getStorage();

  const handleAddProduct = async (event) => {
    event.preventDefault();

    const imageRef = ref(storage, url.name);
    const snapshot = await uploadBytes(imageRef, url);
    const imageUrl = await getDownloadURL(imageRef);

    const productRef = collection(db, "products");
    try {
      const newProduct = { title, description, stock, price, kg, url: imageUrl };
      await addDoc(productRef, newProduct)
      handleProductAdd(newProduct);
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  return (
    <div className="modal-container">
      <h2>Add new product:</h2>

      <form className="modal-form" onSubmit={handleAddProduct}>
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="input-small-group">
          <div className="input-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              placeholder="Stock"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              placeholder="$"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              id="weight"
              placeholder="Kg"
              value={kg}
              onChange={(event) => setKg(event.target.value)}
            />
          </div>
        </div>

        <div className="input-group file-img-div">
          <label htmlFor="url">Image:</label>
          <input className="input-file"
            type="file"
            accept="image/*"
            name="myImage"
            id="url"
            placeholder="Image url"
            value=""
            onChange={(event) => {
              setUrl(event.target.files[0]);
            }}
          />
          {url ? <img style={{width:"50px"}} src={URL.createObjectURL(url)} alt="image of a product" /> : <span>no image </span>}
          
        </div>
        <div className="button-group">
        <button className="button-product-edit" type="submit" > 
          Add Product
        </button>

          <button
            className="button-product-edit"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductModal;
