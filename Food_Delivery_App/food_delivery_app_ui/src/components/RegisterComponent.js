import React, { Component } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
const theme = createTheme();
class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName:'',
			lastName: '',
			phoneNumber: '',
            emailId:'',
            userPassword:'',
            userAddress:'',
            city:'',
            userRole:'',
            errors:''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
  formValidation = () =>{
    const{firstName, lastName, phoneNumber, emailId ,userPassword, userAddress, city, userRole}= this.state;
    let isValid = true;
    const errors ={};
  
    if(firstName.trim().length==0){
    
      console.log(1)
      errors.firstNameLength ="First Name is Required";
      isValid =false;
    }
    else if(firstName.trim().length)
    { //console.log(2)
        var pattern = new RegExp(/^[A-Za-z]+$/);
        if(!pattern.test(firstName))
         {console.log(3)
             errors.firstNameLength="Please Enter alphabets only";
            isValid=false;
            }
    }
    
    if(lastName.trim().length==0){
      console.log(4)
      errors.lastNameLength ="Last Name is Required";
      isValid =false;
    }
    else if(lastName.trim().length)
    {//console.log(5)
        var pattern = new RegExp(/^[A-Za-z]+$/);
        if(!pattern.test(lastName))
         {console.log(6)
             errors.lastNameLength="Please Enter alphabets only";
            isValid=false;
            }
    }
    
    if(phoneNumber.trim().length==0)
  {console.log(7)
   errors.phoneNumberlength ="Phone Number is required";
   isValid =false;
 }
 else if(phoneNumber.trim().length)
  {//console.log(8)
    var pattern = new RegExp(/^[6-9\b]+$/);
    if(!pattern.test(phoneNumber[0]))
      {console.log(9)
        errors.phoneNumberlength="Please Enter valid phone number";
        isValid=false;
      }
      var pattern = new RegExp(/^[0-9\b]+$/);
    if(!pattern.test(phoneNumber))
      {console.log(10)
        errors.phoneNumberlength="Please Enter valid phone number";
        isValid=false;
      }
  
  else if(phoneNumber.trim().length != 10){
    console.log(10)
    errors.phoneNumberlength ="Phone Number should be of 10 digits";
    isValid =false;
  }
}
    if(emailId.trim().length==0){
      errors.emailIdLength ="Email Id is Required";
      isValid =false;
    }
    else if(emailId.trim().length)
        {
            var pattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
          if(!pattern.test(emailId))
            {
              errors.emailIdLength="Please Enter correct email format";
              isValid=false;
            }
          }
        
    if(userPassword.trim().length==0){
      console.log(11)
            errors.userPasswordLength ="Password is Required";
            isValid =false;
    }
    else if(userPassword.trim().length)
        {//console.log(12)
            var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                if(!pattern.test(userPassword))
                  {console.log(13)
                    errors.userPasswordLength="Please Enter correct Password format";
                    isValid=false;
                  }
        }  
        if(userAddress.trim().length==0){console.log(14)
            errors.userAddressLength ="User Address is Required";
            isValid =false;
          }
          else if(userAddress.trim().length)
          {//console.log(15)
              var pattern = new RegExp(/^[A-Za-z0-9'\.\-\s\,]+$/);
              if(!pattern.test(userAddress))
               {console.log(16)
                   errors.userAddressLength="Please Enter Address in correct format";
                  isValid=false;
                  }
          }  
  
  
    if(city.trim().length==0)
     {console.log(17)
      errors.userCitylength ="city is required";
      isValid =false;
    }
    else if(city.trim().length)
    {//console.log(18)
        var pattern = new RegExp(/^[a-zA-Z\s]*$/);
        if(!pattern.test(city))
         {console.log(19)
             errors.userCitylength="Please Enter alphabets only";
            isValid=false;
            }
    }
  
  
  
  this.setState({errors})
  return isValid;
  
   }
  

	submitHandler = e => {
	
		e.preventDefault()
    
		const isValid=this.formValidation()
    console.log(isValid)
      if(isValid )
      {
        alert("Registered Successfully")
        console.log(this.state)
		axios
			.post('https://localhost:5001/api/User/AddUser', this.state )
         
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}
    }
    

	render() {
		const { firstName, lastName, phoneNumber, emailId ,userPassword, userAddress, city, userRole,errors} = this.state
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
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={this.submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
            <div style={{color:"red"}}>{errors.firstNameLength}</div>
           
             
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
            <div style={{color:"red"}}>{errors.lastNameLength}</div>
          </Grid>                            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
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
                  name="emailId"
                  label="Email Id"
                  type="text"
                  id="emailId"
                  autoComplete="abc@xyz.com"
                    value={emailId}
                  onChange={this.changeHandler}
                />
                <div style={{color:"red"}}>{errors.emailIdLength}</div> 
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userPassword"
                  label="User Password"
                  type="password"
                  id="userPassword"
                  autoComplete="userPassword"
                  value={userPassword}
                  onChange={this.changeHandler}
                />
                <div style={{color:"red"}}>{errors.userPasswordLength}</div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userAddress"
                  label="User Address"
                  id="userAddress"
                  autoComplete="userAddress"
                    value={userAddress}
                  onChange={this.changeHandler}
                />
                <div style={{color:"red"}}>{errors.userAddressLength}</div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="city"                
                  id="city"
                  autoComplete="city"
                    value={city}
                  onChange={this.changeHandler}
                />
                <div style={{color:"red"}}>{errors.userCitylength}</div>
              </Grid>


               <Grid item xs={12}>
                  Owner
                < input type ="radio"
                  required
                  fullWidth
                  name="userRole"
                  label="userRole"                
                  id="userRole"
                  autoComplete="userRole"
                    value="Owner"
                  onChange={this.changeHandler}
                /> 

                Customer
                < input type ="radio"
                  required
                  fullWidth
                  name="userRole"
                  label="userRole"                
                  id="userRole"
                  autoComplete="userRole"
                    value="Customer"
                  onChange={this.changeHandler}
                /> 
               {/* <div style={{color:"red"}}>{errors.restaurantImglength}</div>*/}
               </Grid>
                
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Register
            </Button>  
           </Grid>        
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
		)
	}
}

export default Register