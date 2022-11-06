import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import { db } from '../../service/firebase'
import { getDoc, doc } from 'firebase/firestore'



const ItemDetailContainer = () => {
    const {productId} = useParams()
    const [item, setItem] = useState({});

    useEffect(() => {
        const docRef = doc(db, 'products', productId)

        getDoc(docRef).then(res => {
            const data = res.data()
            const productAdapted = { id: res.id, ...data }
            setItem(productAdapted)
        })

        /* const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(Data.find((el) => el.id == productId));
            }, 2000);
        });
        promise.then((data) => {
            setItem(data);
        }); */
      
    }, [productId])
    

    return (
      <>
            <ItemDetail item={item} />
      </>
  )
}

export default ItemDetailContainer