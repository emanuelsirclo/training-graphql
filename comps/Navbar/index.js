import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cart from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';



const Navbar = () => {
    const countCart = 0;
    const [getCountCart, setCountCart] = useState(0);

    useEffect(()=>{
        countCart = JSON.parse(localStorage.getItem("product"));
        if(countCart != null){
            setCountCart(countCart.length)
        }
      }, [countCart]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                    <Link href="/">
                        <HomeIcon />
                    </Link>
                </IconButton>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={getCountCart} color="error">
                        <Link href="/cart">
                            <Cart />
                        </Link>
                    </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
            </AppBar>
        </Box>
    );
}
 
export default Navbar;