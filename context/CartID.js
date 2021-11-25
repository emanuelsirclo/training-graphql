
import React, { useEffect, useState, createContext } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CART } from '../graphql/mutations';



export const CartContext = createContext();

export const CartProvider = (props) => {

    const [generateToken] = useMutation(CREATE_CART);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        const localCartId = JSON.parse(localStorage.getItem('cartID'))
        if(localCartId !== null) {
            setCartId(localCartId);
        }else{
            generateToken()
            .then((res)=>{
                localStorage.setItem('cartID', JSON.stringify(res.data.createEmptyCart))
            })
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('cartID', JSON.stringify(cartId))
    // }, [cartId]);

    return (
        <CartContext.Provider value={[cartId, setCartId]}>
            {props.children}
        </CartContext.Provider>
    )
}