import React, {Component} from 'react';
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
import { useNavigate } from 'react-router-dom';
// import OwnerHomeComponent from './RestarauntOwnerModule/OwnerHomeComponent';

class LoginComponent extends Component{
  constructor()
  {
    super();
    this.state={
      emailId:null,
      password:null,
      role:null,
      login:false,
      token:null,
    }
  }
  login()
  {
    <li><a href='RestaurantUI.js'>Restaurant</a></li>
    console.warn("form data",this.state);
    fetch(`https://localhost:5001/api/User/Login?emailid=${this.state.emailId}&password=${this.state.password}`,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
      // 'Authorization': 'Bearer <token>'
    },
      body:JSON.stringify(this.state)
    }).then((resp)=>{
      resp.json().then((result)=>{
       console.warn("result",result);
       //this.setState((a)=>({...a,role:result.role,token:result.token}))
       //console.log(this.result.role)
       if(result.role=='Owner')
       {
       window.open("http://localhost:3000/restarauntOwner","_self")
      // return <OwnerHomeComponent />;
     // newWindow.my_special_setting=result.userId;
      
       }
       else if(result.role=='Customer')
       {
       var newWindow=window.open("http://localhost:3000/customer","_self")

        //  var newWindow=window.open("http://localhost:3000/restaraunts/","_self")
        //var newWindow.userId=result.userId;
        newWindow.userId=result.userId;
        // console.warn("userId is",result.userId);
       }
      })
    })
  }


  render(){
    return (
      <div>
        
        <h1>Login</h1>
        {/* {this.state.token} */}
        <div>
          <input type="text"   onChange={(event)=>{this.setState({emailId:event.target.value})}} /><br/>
          <input type="text" onChange={(event)=>{this.setState({password:event.target.value})}} /><br/>
          <button onClick={()=>{this.login()}}>Login</button>
        </div>
      </div>
    )
  }
}
export default LoginComponent;