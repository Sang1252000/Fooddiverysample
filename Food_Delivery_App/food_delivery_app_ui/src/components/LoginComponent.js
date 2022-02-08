import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomerHome from './CustomerModule/CustomerHome';
import axios from 'axios';

function Login(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const[emailId,setEmailId]=useState('')
  const[password,setPassword]=useState('')
  const[userDetails,setUserDetails]=useState([]);
  const[role,setRole]=useState('');
  let userData={
    emailId:emailId,
    password:password,
    role:null,
    login:false,
    token:null,
  }
  

  function login()
  {
    <li><a href='RestaurantUI.js'>Restaurant</a></li>
    console.warn("form data",userData);
    fetch(`https://localhost:5001/api/User/Login?emailid=${emailId}&password=${password}`,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
      // 'Authorization': 'Bearer <token>'
    },
      body:JSON.stringify(userData)
    }).then((resp)=>{
      resp.json().then((result)=>{
       console.warn("result",result);
      //  setRole(result.role);
       //this.setState((a)=>({...a,role:result.role,token:result.token}))
       //console.log(this.result.role)
       if(result.role=='Owner')
       {
        var url="http://localhost:3000/restarauntOwner";
        var id=emailId;
        var newWindow=window.open(url+'?id=' + id,"_self")

      // return <OwnerHomeComponent />;
     // newWindow.my_special_setting=result.userId;
      
       }
       else if(result.role=='Customer')
       {
        var url="http://localhost:3000/customer";
        var id=emailId;
       var newWindow=window.open(url+'?id=' + id,"_self")
       //newWindow.data=userDetails.userId;
      //  <CustomerHome id={userDetails.userId} fname={userDetails.firstName} email={userDetails.emailId} city={userDetails.city} />
        //  var newWindow=window.open("http://localhost:3000/restaraunts/","_self")

        //var newWindow.userId=result.userId;
         //newWindow.userId=result.userId;
        // <CustomerHome id={result.userId}/>

        // console.warn("userId is",result.userId);
       }
       else
       {
         alert("Invalid Login Credentials!!");
       }
      })
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://ychef.files.bbci.co.uk/live/624x351/p0736rwz.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={(event)=>{setEmailId(event.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(event)=>{setPassword(event.target.value)}}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>{login()}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Login sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}