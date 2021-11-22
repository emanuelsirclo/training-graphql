import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { GET_CATEGORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { withApollo } from '../lib/apollo'
import { 
  Box,
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
 } from '@mui/material';
import { useRouter } from 'next/dist/client/router';

const Home = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const router = useRouter();

  console.log(router)

  // console.log(getCountries);
  if (loading){
    return (
      <div>Loading..</div>
    )
  }
  const getCategory = data.categoryList;

  const filterCategory = getCategory.filter(category=>category.url_key != null);

  return (
    <div>
      <Container fixed>
        <h1>Category List : </h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {filterCategory && filterCategory.map((item)=>
              <Grid item xs={4} key={item.uid}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href="/[detailProduct]" as={`/${item.url_key}`}>
                      <Button style={{width: "100%"}} size="small" variant="contained">Detail</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default withApollo({ssr: true})(Home);
