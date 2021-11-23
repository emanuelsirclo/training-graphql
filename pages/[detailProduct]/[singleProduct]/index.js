import { GET_SINGLE_PRODUCT } from '../../../graphql/queries'
import { useQuery } from '@apollo/client'
import { withApollo } from '../../../lib/apollo'
import { useRouter } from 'next/dist/client/router';
import { styled } from '@mui/material/styles';
import Link from 'next/link'


import { 
    Box,
    Grid,
    Container,
    Skeleton,
    Paper,
    Button,
    Snackbar
} from '@mui/material';

import InfoIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const detailProduct = () => {
    const router = useRouter();
    const [getOpen, setOpen] = useState(false);

    const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
        variables: {
            filters: {
                url_key: {
                    eq : router.query.singleProduct
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
    const addToCart = (params) =>{
        let arr = [];
        let localData = JSON.parse(localStorage.getItem("product"));
        
        if(localData === null){
            arr.push(params);
            localStorage.setItem("product", JSON.stringify(arr));
        }else{
            arr = localData;
            arr.push(params);
            localStorage.setItem("product", JSON.stringify(arr));
        }

        setOpen(true);
    }

    const handleClose = () =>{setOpen(false)}

    function formatPrice(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
        
    const getSingleProduct = data.products.items[0];
    const imgProduct = getSingleProduct.media_gallery;
    const isStock = getSingleProduct.stock_status == 'IN_STOCK';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{pt:4}}>
                <Grid xs={6}>
                    <Grid container spacing={2}>
                        <Grid xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                            <Item style={{width: '100%', marginBottom:'8px'}}>
                                <img src={getSingleProduct.image.url} style={{maxWidth: '100%', height: '500px'}}></img>
                            </Item>
                        </Grid>
                        {imgProduct && imgProduct.map((itemImage)=>(
                            <Grid xs={4} style={{width: '100%', padding:'0px 8px'}}>
                                <Item>
                                    <img src={itemImage.url} style={{maxWidth: '100%', height: 'auto'}}></img>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <div style={{margin: '0px 16px'}}>
                        <h1>{getSingleProduct.name}</h1>
                        <p>SKU : {getSingleProduct.sku}</p>
                        <span dangerouslySetInnerHTML={{__html: `${getSingleProduct.description.html}`}}></span>
                        <h4>Rp. {formatPrice(getSingleProduct.price_range.maximum_price.final_price.value)}</h4>
                        <div>
                            <Button 
                                variant="outlined" 
                                disabled={!isStock} 
                                style={{width: '100%'}}
                                onClick={()=>addToCart({
                                    id: getSingleProduct.uid,
                                    name: getSingleProduct.name,
                                    image: getSingleProduct.image.url,
                                    sku: getSingleProduct.sku,
                                    price: getSingleProduct.price_range.maximum_price.final_price.value
                                })}
                            >
                                {isStock ? 'Add to Cart' : 'Out of Stock' } 
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Snackbar
                open={getOpen}
                autoHideDuration={1000}
                message="Success Add To Cart"
                onClose={handleClose}
            />
        </Box>
    )
    }

export default withApollo({ssr: true})(detailProduct);
