import { gql } from "@apollo/client"

export const CREATE_CART = gql`
    mutation {
        createEmptyCart
    }
`; 

export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart($cart_id: String!, $sku: String!, $quantity: Float!) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cart_id
                cart_items: {
                    data: {
                        sku: $sku
                        quantity: $quantity
                    }
                }
            }
        ) {
            cart {
                id        
            }
        }
    }
`