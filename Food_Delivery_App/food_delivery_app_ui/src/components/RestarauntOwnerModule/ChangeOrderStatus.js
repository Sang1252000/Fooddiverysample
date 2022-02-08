import React, { Component } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const theme = createTheme();
class ChangeOrderDeliveryStatus extends Component {
	constructor(props) {
		super(props)

		this.state = {
			orderId:'',
            orderStatus:'',
            errors:''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

  formValidation = () =>{
    const{orderId,orderStatus}= this.state;
    let isValid = true;
    const errors ={};
  
    if(orderId.trim().length==0){
      errors.orderIdlength ="Order Id is Required";
      isValid =false;
    }
    else if(orderId.trim().length)
    {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if(!pattern.test(orderId))
        {
          errors.orderIdlength="Please Enter digits";
          isValid=false;
        
      }
  else if(orderId.trim().length>3){
      errors.orderIdlength ="Item Id is too long";
      isValid =false;
    }
  }

  if(orderStatus.trim().length==0)
  {
   errors.orderStatuslength ="Order Status is required";
   isValid =false;
 }
 else if(orderStatus.trim().length)
 {
    var pattern = new RegExp(/^[A-Za-z0-9'\.\-\s\,]+$/);
   if(!pattern.test(orderStatus))
     {
       errors.orderStatuslength="Please Enter valid message";
       isValid=false;
     }
else if(orderStatus.trim().length<3 || orderStatus.trim().length>50)
 {
   errors.orderStatuslength ="Order status should be of 3-15 characters";
   isValid =false;
 }
}
  
     //If Required

  this.setState({errors})
  return isValid;
  
   }

	submitHandler = e => {
		e.preventDefault()
    const isValid=this.formValidation()
    if(isValid)
    {
        alert("Successfully updated item");
      console.log(this.state)
      axios
        .put('https://localhost:5001/api/RestaurantOwner/UpdateOrderStatus',this.state )
           
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
		
	}

    
	render() {
		const { orderId,orderStatus, errors} = this.state
		return (
			<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Order Delivery
          </Typography>
          <Box component="form" noValidate onSubmit={this.submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="orderId"
              label="Order Id"
              name="orderId" 
              value={orderId}             
              onChange={this.changeHandler}
            />
             <div style={{color:"red"}}>{errors.orderIdlength}</div>
          </Grid> 
          
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="orderStatus"
              label="Order Status"
              name="orderStatus"
              value={orderStatus}              
              onChange={this.changeHandler}
            />
             <div style={{color:"red"}}>{errors.orderStatuslength}</div>
          </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Update Order Delivery Status
            </Button>            
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
		)
	}
}

export default ChangeOrderDeliveryStatus