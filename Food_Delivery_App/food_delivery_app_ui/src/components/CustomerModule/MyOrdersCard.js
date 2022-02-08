import React,{useState,useEffect} from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function MyOrdersCard(props)
{
  const[message,setMessage]=useState('Order cancelled!!!!');
  function CancelOrder(){
    axios.put(`https://localhost:5001/api/Customer/CancelOrder?orderId=${props.id}`)
        .then((response) => {
            console.log(response.data);
            alert(message);
        })
}
    return(
    <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        Order Id : {props.id}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Date : {props.date}
      </Typography>
      <Typography variant="body2">
        Amount : {props.amount} Rs
      </Typography>
      <Typography variant="body2">
        Status : {props.status}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={()=>{CancelOrder()}}>Cancel Now</Button>
    </CardActions>
  </React.Fragment>
    )
}