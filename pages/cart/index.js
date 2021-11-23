import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/dist/client/router';
import { withApollo } from '../../lib/apollo'
import Link from 'next/link'
import { useEffect, useState } from 'react';

import { 
  Box,
  Grid,
  Container,
 } from '@mui/material';
import { Summarize } from '@mui/icons-material';


function formatPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const Cart = () => {
    const [getListCart, setListCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [getTotal, setTotal] = useState(true);

    useEffect(()=>{
        const localData = JSON.parse(localStorage.getItem("product"));
        const arr = [];
        if(localData != null){
            setListCart(localData);
        }
        for(let i=0;i<=localData.length-1;i++){
            arr.push(localData[i].price)
            setTotal(arr.reduce((a, b) => a + b, 0));
        }
    }, []);

    if(getListCart){
        return (
            <div>
              <Container fixed>
                <h1>Your Cart</h1>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {getListCart.map((itm)=>(
                        <Grid item xs={12} key={itm.id}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <img src={itm.image} style={{width:'100%', height: '200px', objectFit:'cover', objectPosition:'top'}} ></img>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>{itm.name}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>Rp. {formatPrice(itm.price)}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <hr/>
                    </Grid>
                    <Grid item xs={8} style={{display: 'flex', justifyContent: 'center', marginBottom: '32px'}}>
                        <h4 style={{margin: '0'}}>GRAND TOTAL</h4>
                    </Grid>
                    <Grid item xs={4}>
                        <h4 style={{margin: '0'}}>Rp. {formatPrice(getTotal)}</h4>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </div>
          )
    }else if(getListCart === null){
        return (
            <Container fixed style={{display: 'flex', justifyContent: 'center'}}>
                <h1>Your Cart is Empty</h1>
              </Container>
          )
    }else{
        return (
            <div>
              Loading...
            </div>
          )
    }
}

export default withApollo({ssr: true})(Cart);
