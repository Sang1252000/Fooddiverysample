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
class UpdateRestaurant extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userId: '',
      restaurantId: '',
			restaurantName: '',
            phoneNumber: '',
            restaurantAddress: '',
            city: '',
            restaurantImg: '',
            errors:''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

  formValidation = () =>{
    const{userId,restaurantId,restaurantName,phoneNumber,restaurantAddress,city,restaurantImg}= this.state;
    let isValid = true;
    const errors ={};
  
    if(userId.trim().length==0){
      errors.useridlength ="User Id is Required";
      isValid =false;
    }
    else if(userId.trim().length)
    {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if(!pattern.test(userId))
        {
          errors.useridlength="Please Enter digits";
          isValid=false;
        
      }
  else if(userId.trim().length>3){
      errors.useridlength ="User Id is too long";
      isValid =false;
    }
  }


  if(restaurantId.trim().length==0){
    errors.restaurantIdlength ="Restaurant Id is Required";
    isValid =false;
  }
  else if(restaurantId.trim().length)
  {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(!pattern.test(restaurantId))
      {
        errors.restaurantIdlength="Please Enter digits";
        isValid=false;
      
    }
else if(restaurantId.trim().length>10){
    errors.restaurantIdlength ="Restaurant Id is too long";
    isValid =false;
  }
}
     //If Required
    
    
     if(restaurantName.trim().length==0)
     {
      errors.restaurantlength ="Restauranth is required";
      isValid =false;
    }
    else if(restaurantName.trim().length)
    {
      var pattern = new RegExp(/^[A-Za-z0-9'\.\-\s\,]+$/);
      if(!pattern.test(restaurantName))
        {
          errors.restaurantlength="Please Enter valid name";
          isValid=false;
        }
  else if(restaurantName.trim().length<3 || restaurantName.trim().length>15)
    {
      errors.restaurantlength ="Restaurant Name should be of 3-15 characters";
      isValid =false;
    }
  }
    if(phoneNumber.trim().length==0)
    {
     errors.phoneNumberlength ="Phone Number is required";
     isValid =false;
   }
   else if(phoneNumber.trim().length)
    {
      var pattern = new RegExp(/^[6-9\b]+$/);
      if(!pattern.test(phoneNumber[0]))
        {
          errors.phoneNumberlength="Please Enter valid phone number";
          isValid=false;
        }
        var pattern = new RegExp(/^[0-9\b]+$/);
      if(!pattern.test(phoneNumber))
        {
          errors.phoneNumberlength="Please Enter valid phone number";
          isValid=false;
        }
    
    else if(phoneNumber.trim().length != 10){
      errors.phoneNumberlength ="Phone Number should be of 10 digits";
      isValid =false;
    }
  }
    if(restaurantAddress.trim().length==0){
      errors.restaurantAddresslength ="Address is Required";
      isValid =false;
    }
  
    // if(restaurantImg.trim().length==0){
    //   errors.restaurantImglength ="Image is Required";
    //   isValid =false;
    // }
    // else if(!restaurantImg.includes(".jpeg")){
    //   errors.restaurantImglength ="Image is Required";
    //   isValid =false;
    // }
     
  
    if(city.trim().length==0)
     {
      errors.citylength ="city is required";
      isValid =false;
    }
    else if(city.trim().length<3 || city.trim().length>50){
      errors.citylength ="City can't be below 3 or above 50 characters";
      isValid =false;
    }
  
  
  this.setState({errors})
  return isValid;
  
   }



	submitHandler = e => {
		e.preventDefault()
    const isValid=this.formValidation()
    if(isValid)
    {
      alert("Restaraunt Updated Successfully")
      console.log(this.state)
      axios
        .put('https://localhost:5001/api/RestaurantOwner/UpdateRestaurant', this.state )
           
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
		
	}

    
	render() {
		const { userId,restaurantId,restaurantName,phoneNumber, restaurantAddress,city,restaurantImg, errors} = this.state
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
            Update Restaurant
          </Typography>
          <Box component="form" noValidate onSubmit={this.submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="userId"
              label="User Id"
              name="userId" 
              value={userId}             
              onChange={this.changeHandler}
            />
             <div style={{color:"red"}}>{errors.useridlength}</div>
          </Grid> 
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="restaurantId"
              label="Restaurant Id"
              name="restaurantId"
              value={restaurantId}              
              onChange={this.changeHandler}
            />
            <div style={{color:"red"}}>{errors.restaurantIdlength}</div>
          </Grid> 
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="restaurantName"
              label="Restaurant Name"
              name="restaurantName"
              value={restaurantName}              
              onChange={this.changeHandler}
            />
             <div style={{color:"red"}}>{errors.restaurantlength}</div>
          </Grid>                            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  id="phoneNumber"
                  autoComplete="Phone-Number"
                  value={phoneNumber}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.phoneNumberlength}</div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="restaurantAddress"
                  label="Address"
                  type="text"
                  id="restaurantAddress"
                  autoComplete="Address"
                  value={restaurantAddress}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.restaurantAddresslength}</div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="text"
                  id="city"
                  autoComplete="City"
                  value={city}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.citylength}</div>
              </Grid>
              <Grid item xs={12}>
              <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="restaurantImg"
                  name="restaurantImg"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.changeHandler}
                  value={restaurantImg}
                />
                {/* <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label> */}
              </div>
            </div>
                 {/* <div style={{color:"red"}}>{errors.restaurantImglength}</div> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Update Restaurant
            </Button>            
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
		)
	}
}

export default UpdateRestaurant