import React, { useState, useEffect } from "react";
import "./EditProducts.css";
import { db } from "../../service/firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import AddProductModal from "./AddProductModal";


const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProductIndex, setEditingProductIndex] = useState(-1);
  const [showAddProductModal, setShowAddProductModal] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const collectionRef = collection(db, "products");
      const snapshot = await getDocs(collectionRef);
      const productsArray = [];
      snapshot.forEach((doc) => {
        const productsData = { ...doc.data(), id: doc.id };
        productsArray.push(productsData);
      });
      setProducts(productsArray);
      console.log("success", productsArray);
    };
    fetchProducts();
  }, [products]);

  const handleEditClick = (product, index) => {
    setSelectedProduct({ ...product, index });
    setEditingProductIndex(index);
  };
  
  const handleProductUpdate = async (updatedProduct) => {
    const productRef = doc(db, "products", updatedProduct.id);
    await updateDoc(productRef, updatedProduct);
    const newProducts = [...products];
    newProducts[updatedProduct.index] = updatedProduct;
    setProducts(newProducts);
    setSelectedProduct(null);
    setEditingProductIndex(-1);
};

  const handleDelete = async (productId, index) => {
    // Delete product from database
    // ...
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };


  return (
    <div className="edit-prod-container" style={{fontFamily: "monserrat"}} >
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",  width:"100%",  paddingInline:"30px", height:"100%"
      }}>
        <h5 className="edit-title" style={{fontFamily: "monserrat"}}>Edit Products</h5>
        
        {!showAddProductModal && <button className="button-product-edit" onClick={openAddProductModal}>Add Product</button> }
      </div>

      {showAddProductModal && (
          <AddProductModal closeModal={closeAddProductModal}  />
        )}
  
      <div className="product-table">
        <div className="table-header">
          <div className="product-title">Product</div>
          <div className="product-description">Description</div>
          <div className="product-stock">Stock</div>
          <div className="product-price">Price</div>
          <div className="product-weight">Weight</div>
          <div className="product-url">URL</div>
          <div className="product-actions">Action</div>
        </div>
        {products.map((product, index) => (
          <div key={product.id} id={`product-${index}`} className="table-row">
            {editingProductIndex === index ? (
              <>
                <div className="product-title">
                  <input
                    className="input-field"
                    type="text"
                    value={selectedProduct.title}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="product-description">
                  <input
                    className="input-field"
                    type="text"
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="product-stock">
                  <input
                    className="input-field"
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        stock: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="product-price">
                  <input
                    className="input-field"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="product-weight">
                  <input
                    className="input-field"
                    type="number"
                    value={selectedProduct.kg}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        kg: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="product-url">
                  <input
                    className="input-field"
                    type="text"
                    value={selectedProduct.url}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        url: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="product-actions">
                  <button
                    className="button-product-save button-product-edit"
                    onClick={() => handleProductUpdate(selectedProduct)}
                  >
                    Save
                  </button>

                </div>
              </>
            ) : (
              <>
                <div className="product-title">{product.title}</div>
                <div className="product-description">{product.description}</div>
                  <div className="product-stock">{product.stock}</div>
                  <div className="product-price">{product.price}</div>
                  <div className="product-kg">{product.kg}</div>
                  <div className="product-url">{product.url}</div>
                <div className="product-actions">
                  <button
                    className="button-product-edit"
                    onClick={() => handleEditClick(product, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-product-edit"
                    onClick={() => handleDelete(product.id, index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
  
    </div>
  );
  
};
export default EditProducts;
