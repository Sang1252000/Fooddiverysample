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



const theme = createTheme();

class AddAgent extends Component {
    
	constructor(props) {
		super(props)

		this.state = {
			restaurantId: '',
			agentName: '',
			agentPhone: '',
            errors:''
            
		}
	}
    
    formValidation = () =>{
        const{agentName,agentPhone}= this.state;
        let isValid = true;
        const errors ={};
      
        
        
         if(agentName.trim().length==0)
         {
          errors.agentNameLength ="Agent Name is required";
          isValid =false;
        }
      else if(agentName.trim().length<3 || agentName.trim().length>20)
        {
          errors.agentNameLength ="Agent Name should be of 3-20 characters";
          isValid =false;
        }
        else if(agentName.trim().length)
        {
            var pattern = new RegExp(/^[A-Za-z]+$/);
            if(!pattern.test(agentName))
             {
                 errors.agentNameLength="Please Enter alphabets only";
                isValid=false;
                }
        }
        if(agentPhone.trim().length==0)
        {
         errors.phoneNumberlength ="Phone Number is required";
         isValid =false;
       }
       else if(agentPhone.trim().length)
        {
            var pattern = new RegExp(/^[789]\d{9}$/);
          if(!pattern.test(agentPhone))
            {
              errors.phoneNumberlength="Please Enter correct phone no format";
              isValid=false;
            }
        
            else if(agentPhone.trim().length != 10){
          errors.phoneNumberlength ="Phone Number should be of 10 digits";
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
            .post('https://localhost:5001/api/RestaurantOwner/AddAgentDetails', this.state )
         
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            alert("Agent Added Successfully")
        }
      }

	render() {
		const { restaurantId, agentName, agentPhone,errors } = this.state
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Avatar src="/broken-image.jpg" />
          <Typography component="h1" variant="h5">
            Add Agent
          </Typography>
          <Box component="form" noValidate onSubmit={this.submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="restaurantId"
              label="Restaurant Id"
              name="restaurantId" 
                           
              onChange={this.changeHandler}
            />
          </Grid> 
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="agentName"
              label="Agent Name"
              name="agentName"  
              value={agentName}            
              onChange={this.changeHandler}
            />
          <div style={{color:"red"}}>{errors.agentNameLength}</div>
          </Grid>                            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="agentPhone"
                  label="Agent PhoneNumber"
                  type="tel"
                  id="agentPhone"
                  value={agentPhone}
                  autoComplete="Phone-Number"
                  onChange={this.changeHandler}
                />
              <div style={{color:"red"}}>{errors.phoneNumberlength}</div>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}              
            >
              Add Delivery Agent
            </Button>            
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
			
		)
	}
}

export default AddAgent