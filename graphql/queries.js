import { gql } from "@apollo/client"

export const GET_COUNTRIES = gql`
    query getCountries{
        countries{	
        full_name_locale
        }
    }
`; 

export const GET_CATEGORIES = gql`
  query getCategory{
    categoryList(filters:{}) {
        uid,
        name,
        url_key,
        image
    }
  }
`; 

export const GET_PRODUCT_BY_CATEGORY = gql`
  query getProductByCategory($filters: CategoryFilterInput){
    categoryList(filters:$filters) {
        uid,
        name,
        url_key,
        image
        products{
            items{
                uid,
                url_key,
                name
                image{
                    url
                }
            }
        }
    }
  }
`; 

export const GET_SINGLE_PRODUCT = gql `
  query getProduct($filters: ProductAttributeFilterInput) {
    products(filter:$filters) {
        items {
            uid,
            url_key
            name
            description {
                html
            }
            price_range{
              maximum_price{
                final_price{
                  currency,
                  value
                }
              }
            }
            image {
                url
            }
            sku
            stock_status
            media_gallery {
              url
            }
        }
    }
  }
`;