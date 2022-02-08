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
export default class CustomerUpdateDetails extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userId:'',
      firstName:'',
      lastName:'',
      phoneNumber:'',
      emailId:'',
      userPassword:'',
      userAddress:'',
      city:'',
      userRole:"Customer",
      errors:''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

  formValidation = () =>{
    const{userId,firstName,lastName,userAddress,userPassword,city,phoneNumber,emailId}= this.state;
    let isValid = true;
    const errors ={};



    
    if(emailId.trim().length==0)
  {
   errors.emailidlength ="Phone Number is required";
   isValid =false;
 }
 else if(emailId.trim())
 {
    var pattern=new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    if(!pattern.test(emailId))
    {
        errors.emailidlength="Enter email again";
        isValid=false;
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
  
     //If Required
    
    
     if(firstName.trim().length==0)
     {
      errors.firstNamelength ="First Name is required";
      isValid =false;
    }
    else if(firstName.trim().length)
    {
      var pattern = new RegExp(/^[A-Za-z]+$/);
      if(!pattern.test(firstName))
        {
          errors.firstNamelength="Please Enter valid name";
          isValid=false;
        }
  else if(firstName.trim().length<3 || firstName.trim().length>15)
    {
      errors.firstNamelength ="First Name should be of 3-15 characters";
      isValid =false;
    }
  }

  if(lastName.trim().length==0)
  {
   errors.lastNamelength ="Last Name is required";
   isValid =false;
 }
 else if(lastName.trim().length)
 {
   var pattern = new RegExp(/^[A-Za-z]+$/);
   if(!pattern.test(lastName))
     {
       errors.lastNamelength="Please Enter valid name";
       isValid=false;
     }
else if(lastName.trim().length<3 || lastName.trim().length>15)
 {
   errors.lastNamelength ="Last Name should be of 3-15 characters";
   isValid =false;
 }
}

if(userAddress.trim().length==0){
  errors.userAddresslength ="Address is Required";
  isValid =false;
}
if(city.trim().length==0)
   {
    errors.citylength ="city is required";
    isValid =false;
  }
  else if(city.trim().length<3 || city.trim().length>10){
    errors.citylength ="City can't be below 3 or above 10 characters";
    isValid =false;
  }

  if(userPassword.trim().length==0){
      console.log(1);
    errors.userpasswordlength ="Password is Required";
    isValid =false;
  }
  else if(userPassword.trim())
  {
    var pattern = new RegExp("^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\])(?=.{8,})");
    if(!pattern.test(userPassword))
    {
        errors.userpasswordlength="Please Enter correct Password";
        isValid=false;
    }
      
  }


  
  
   
  
  
  this.setState({errors})
  return isValid;
  
   }



	submitHandler = e => {
		e.preventDefault()
    const isValid=this.formValidation()
    if(isValid)
    {
        alert("Successfully updated customer details");
      console.log(this.state)
      axios
        .put('https://localhost:5001/api/Customer/UpdateCustomer', this.state )
           
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
		
	}

    
	render() {
		const { userId,firstName,lastName,userAddress,userPassword,city,phoneNumber,emailId, errors} = this.state
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
            Update customer
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
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}              
              onChange={this.changeHandler}
            />
            <div style={{color:"red"}}>{errors.firstNamelength}</div>
          </Grid> 
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}              
              onChange={this.changeHandler}
            />
            <div style={{color:"red"}}>{errors.lastNamelength}</div>
          </Grid> 
          <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  
                  id="phoneNumber"
                  
                  value={phoneNumber}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.phoneNumberlength}</div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="emailId"
                  label="Email Id"
                  
                  id="emailId"
                  
                  value={emailId}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.emailidlength}</div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userPassword"
                  label="User Password"
                  
                  id="userPassword"
                  
                  value={userPassword}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.userpasswordlength}</div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userAddress"
                  label="User Address"
                  
                  id="userAddress"
                  
                  value={userAddress}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.userAddresslength}</div>
              </Grid>
             

             

             
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  
                  id="city"
                  
                  value={city}
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.citylength}</div>
              </Grid>

              {/* <Grid item xs={12}>
                <div
                  required
                  fullWidth
                  name="userRole"
                  label="User Role"
                  
                  id="userRole"
                  
                  value={0}
                  onChange={this.changeHandler}
                />
              </Grid> */}

              
               
               
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Update Customer
            </Button>            
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
		)
	}
}