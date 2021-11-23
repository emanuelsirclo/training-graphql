import { GET_PRODUCT_BY_CATEGORY } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { withApollo } from '../../lib/apollo'
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'


import { 
    Box,
    Grid,
    Container,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListSubheader,
    IconButton,
    Skeleton,
    Snackbar
} from '@mui/material';

import InfoIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';

const detailProduct = () => {
    const router = useRouter();
    const [getOpen, setOpen] = useState(false);
    const [getStorage, setStorage] = useState(null);

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
            <Container fixed>
                <Box sx={{ flexGrow: 1, pt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Skeleton variant="rectangular" width="100%" height="400px" />
                        </Grid>
                        <Grid item xs={4}>
                            <Skeleton variant="rectangular" width="100%" height="400px" />
                        </Grid>
                        <Grid item xs={4}>
                            <Skeleton variant="rectangular" width="100%" height="400px" />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }
        
        
    const getProduct = data.categoryList[0].products.items;
  return (
        <ImageList sx={{ width: '100%', height: '100%' }}>
            <ImageListItem key="Subheader" cols={3}>
                <ListSubheader component="div">
                    <h1>Detail Product</h1>
                </ListSubheader>
            </ImageListItem>
            {getProduct && getProduct.map((item) => (
                <ImageListItem key={item.uid}>
                <img
                    src={`${item.image.url}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.name}
                    actionIcon={
                    <Link href="/[detailProduct]/[singleProduct]" as={`/${router.query.detailProduct}/${item.url_key}`}>
                        <IconButton
                            sx={{ backgroundColor: 'black', borderRadius: '8px', margin: '0 8px', color: 'rgba(255, 255, 255)' }}
                        >
                                <InfoIcon />
                        </IconButton>
                    </Link>
                    }
                />
                </ImageListItem>
            ))}
        </ImageList>
  )
}

export default withApollo({ssr: true})(detailProduct);
