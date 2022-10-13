import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemDetailContainer.css'
import ItemDetail from '../ItemDetail/ItemDetail'
import Data from '../../stock.json'


const ItemDetailContainer = () => {
    const {productId} = useParams()
    const [item, setItem] = useState({});

    useEffect(() => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(Data.find((el) => el.id == productId));
            }, 2000);
        });
        promise.then((data) => {
            setItem(data);
        });
      
    }, [productId])
    

    return (
      <>
            <ItemDetail item={item} />
      </>
  )
}

export default ItemDetailContainer