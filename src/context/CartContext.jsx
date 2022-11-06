import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext({
    cart: [],
    cdadTotal: 0
})

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [cdadTotal, setCdadTotal] = useState(0)
    const [precioTotal, setPrecioTotal] = useState(0)

    console.log(precioTotal);

    useEffect(() => {
        const totalCdad = getCdad()
        const totalPrecio = totalPrice()
        setCdadTotal(totalCdad)
        setPrecioTotal(totalPrecio)
    }, [cart])
    

    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
            {Swal.fire({
                icon: "success",
                title: "Success!",
                text: `Producto añadido con éxito`,
              })}
        } else {
            {Swal.fire({
                icon: "error",
                title: "Error",
                text: `El producto ya se encuentra en el carrito`,
              })}
        }
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const cartWithoutProduct = cart.filter(prod => prod.id !== id)
        setCart(cartWithoutProduct)
    }

    const getCdad = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.count
        })

        return accu
    }

    const clearCart = () => {
        setCart([])
    }

    const totalPrice = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += Number(prod.price)* prod.count
        })

        return accu
    }

    return (
        <CartContext.Provider value={{cart, addItem, cdadTotal, removeItem, precioTotal, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}