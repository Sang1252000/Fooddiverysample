import  React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import food5 from './food5.jpg';
import { useCart } from "react-use-cart";
import { fabClasses } from '@mui/material';
import ViewCart from './ViewCart';

export default function ItemCard(props) {
    const[selectedQty,setSelectedQty]=React.useState(0)
    const[isClicked,setClicked]=useState(true);
    const { addItem } = useCart();
  return (
    <div>
    <Grid  xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"                   
                    image={food5}
                    alt="restaurant image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {props.itemName} 
                    </Typography>
                    <Typography>                   
                    Price : {props.price}                    
                    </Typography>
                    <Typography>
                     Description of Dish: {props.itemDescription}
                    </Typography>
                  </CardContent>
                  <CardActions> 
                  <Button variant={ isClicked ? "contained" : "outlined"}  className="btn btn-success" onClick={() => addItem(props.item)}>
                   Add To Cart
                  </Button>
                  </CardActions>
                </Card>
    </Grid>
    <ViewCart restarauntId={props.restarauntId} userId={props.userId}/>
    </div>
  );
}