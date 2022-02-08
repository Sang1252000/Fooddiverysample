import React, { Component,useState,useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ItemCard from './ItemCard';
export default function Item (props)
 {
  const [items, setItems] = useState([]);
  const[isLoaded,setIsLoaded]=useState(false);
  const[selectedItemPrice,setItemPrice]=useState(0);
      useEffect(() => {
        axios.get(`https://localhost:5001/api/RestaurantOwner/ViewMenu?restaurantId=${props.id}`)
            .then((response) => {
                setItems(response.data);
                setIsLoaded(true);
            })
    }, [])
 
    if (!isLoaded)
            return <div>Loading...</div>;
 
        return (
          <div>        
         <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {
               items.map((item,index)=> {
                return(
                 <ItemCard 
                 itemName={item.itemName} 
                 itemDescription={item.itemDescription}
                 price={item.price}
                 key={index} 
                 item={item}
                 restarauntId={props.id}
                 userId={props.userId}/>
             )
             })
            }
          </Grid>
        </Container>
          </div>
          );
}