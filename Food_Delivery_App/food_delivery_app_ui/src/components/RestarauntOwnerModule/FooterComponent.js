import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppBar, Toolbar } from '@mui/material';
 
function Footer(){
    return(
        <div>       
                <AppBar position="static" color="primary">
                  <Container maxWidth="md">
                    <Toolbar>
                      <Typography variant="body1" color="inherit">
                        &copy; 2022 Food Delivery Application
                      </Typography>
                    </Toolbar>
                  </Container>
                </AppBar>              
    </div>
    )
}
 
export default Footer;