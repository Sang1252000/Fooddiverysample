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


// //const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const NAME_REGEX =/^[a-zA-Z ]{2,20}$/;
// const DESCRIPTION_REGEX =/^[a-zA-Z ]{2,50}$/;
// const PRICE_REGEX =/^\d*\.?\d+$/;

const theme = createTheme();
class AddItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
            restaurantId: '',
			      itemName: '',
            price:'',
            itemDescription: '',
            itemImg:'' ,
            errors:'' 
            
		}
	}

  formValidation = () =>{
    const{itemName,itemDescription,price,itemImg}= this.state;
    let isValid = true;
    const errors ={};
  
    
    
     if(itemName.trim().length==0)
     {
      errors.itemNameLength ="Item Name is required";
      isValid =false;
    }
  else if(itemName.trim().length<3 || itemName.trim().length>20)
    {
      errors.itemNameLength ="Item Name should be of 3-20 characters";
      isValid =false;
    }
    else if(itemName.trim().length)
    {
        var pattern = new RegExp(/^[a-zA-Z\s]*$/);
        if(!pattern.test(itemName))
         {
             errors.itemNameLength="Please Enter alphabets only";
            isValid=false;
            }
    }
    if(price.trim().length==0)
   {
    errors.priceLength ="price is required";
    isValid =false;
  }
  // else {
  //   var pattern= new RegExp(/^[0-9]+$/);
  //   errors.pricelength ="enter price in correct format ";
  //   isValid =false;
  // }
    if(itemDescription.trim().length==0)
    {
     errors.itemDescriptionLength ="Item Description is required";
     isValid =false;
   }
   else if(itemDescription.trim().length)
    {
        var pattern = new RegExp(/^[a-zA-Z\s]*$/);
      if(!pattern.test(itemDescription))
        {
          errors.itemDescriptionLength="Please Enter alphabets only";
          isValid=false;
        }
    
        else if(itemDescription.trim().length<3 || itemDescription.trim().length>50){
      errors.itemDescriptionLength ="Item Description should be of 3-50 characters";
      isValid =false;
    }

    if(itemImg.trim().length==0){
      errors.itemImgLength ="Image is Required";
      isValid =false;
    }
    
    
}
     
  this.setState({errors})
  return isValid;
  
   }
   

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
    e.preventDefault()
    const isValid=this.formValidation()
    
  if(isValid)
  {
    console.log(this.state)
    axios
        .post('https://localhost:5001/api/RestaurantOwner/AddItem', this.state )
     
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        alert("Item Added Successfully")
        }
        
    }

    
   

	render() {
		const { restaurantId,itemName,price,itemDescription,itemImg,errors} = this.state
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
         <Avatar src="/broken-image.jpg" />
          <Typography component="h1" variant="h5">
            Add Item
          </Typography>
          <Box component="form" noValidate onSubmit={this.submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="itemName"
              label="itemName"
              name="itemName"    
              value={itemName}         
              onChange={this.changeHandler}
            />
              <div style={{color:"red"}}>{errors.itemNameLength}</div> 
          </Grid> 
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="restaurantId"
              label="restaurantId"
              name="restaurantId"  
                           
              onChange={this.changeHandler}
            />
            
          </Grid> 
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="price"
              label="price"
              name="price" 
              type="number"   
              value={price}              
              onChange={this.changeHandler}
            />
             <div style={{color:"red"}}>{errors.priceLength}</div>
          </Grid>                            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="itemDescription"
                  label="itemDescription "                 
                  id="itemDescription"
                  value={itemDescription}    
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.itemDescriptionLength}</div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="itemImg"
                  label="itemImg"
                  type="text"
                  id="itemImg"
                  autoComplete="itemImg"
                  value={itemImg}    
                  onChange={this.changeHandler}
                />
                 <div style={{color:"red"}}>{errors.itemImgLength}</div>
              </Grid>
        
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Add Item
            </Button>            
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
		)
	}
}

export default AddItem