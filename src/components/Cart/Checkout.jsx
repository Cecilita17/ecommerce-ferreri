import React from "react";
import FormCheckout from "../FormCheckout/FormCheckout";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  collection,
  getDocs,
  writeBatch,
  query,
  where,
  documentId,
  addDoc,
} from "firebase/firestore";
import { db } from "../../service/firebase/index";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const [datosCompra, setDatosCompra] = useState({});
  const [personalData, setPersonalData] = useState(false);

  const information = (name, phone, email) => {
    setDatosCompra({ name, phone, email });
    setPersonalData(true);
  };

  const { cart, cdadTotal, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      const objOrder = {
        buyer: datosCompra,
        items: cart,
        total: cdadTotal,
      };

      const batch = writeBatch(db);

      const outOfStock = [];

      const ids = cart.map((prod) => prod.id);

      const productsRef = collection(db, "products");

      const productsAddedFromFirestore = await getDocs(
        query(productsRef, where(documentId(), "in", ids))
      );

      const { docs } = productsAddedFromFirestore;

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;

        const productAddedToCart = cart.find((prod) => prod.id === doc.id);

          const prodQuantity = productAddedToCart?.count;

        if (stockDb >= prodQuantity) {
          batch.update(doc.ref, { stock: stockDb - prodQuantity });
        } else {
            outOfStock.push({ id: doc.id, ...dataDoc });
            console.log(outOfStock);
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit()

        const orderRef = collection(db, 'orders');

        const orderAdded = await addDoc(orderRef, objOrder);
          

        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(`El id de su orden es: ${orderAdded.id}`);

        Swal.fire({
          icon: "success",
          title: "La orden de compra se realizó con éxito",
          text: `Código de operación: ${orderAdded.id}`,
        });
      } else {
          console.log("error no se pudo realizar la compra ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formWrapper">
      <div className="titleCheckout" >Checkout </div>
      
      {personalData ? (
        <button style={{border:"none", borderRadius:"3px", width:"300px",  backgroundColor:"#1c71ff", color:"white", height:"40px"}} onClick={createOrder}>
          Finalizar compra
        </button>
      ) : (
        <FormCheckout information={information} />
      )}
    </div>
  );
};

export default Checkout;
