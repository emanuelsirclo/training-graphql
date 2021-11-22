
import Link from 'next/link'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { GET_PRODUCT_BY_CATEGORY } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { withApollo } from '../../lib/apollo'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useRouter } from 'next/dist/client/router';

const detailProduct = () => {
    const router = useRouter();

    const { loading, error, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
        variables: {
            filters: {
                url_key: {
                    eq : router.query.detailProduct
                }
            }
        }
    });


    if (loading){
        return (
            <div>Loading..</div>
            )
        }
        
    const getProduct = data.categoryList[0].products.items;

  return (
    <div>
      {getProduct && getProduct.map((item, index)=>
            <div key={item.name}>
                <p>{item.name}</p>
            </div>
        )}
    </div>
  )
}

export default withApollo({ssr: true})(detailProduct);
