import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
 
export default class Item extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isLoaded: false
        };
      }
      
      componentDidMount() {           
        
        fetch('https://localhost:5001/api/RestaurantOwner/ViewMenu?restaurantId=1')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true, 
                })
            }).catch((err) => {
                console.log(err);
            });
    }
 
      render() {
        const { isLoaded, items } = this.state;
 
        if (!isLoaded)
            return <div>Loading...</div>;
 
        return (
          <div>
            <h2>All Items</h2>            
    <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {this.state.items.map(item => (
              <Grid item key={item.itemId} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"                   
                    image="https://source.unsplash.com/random"
                    alt="restaurant image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {item.itemName} 
                    </Typography>
                    <Typography>                    
                    Price : {item.price}                    
                    </Typography>
                    <Typography>
                     Description of Dish: {item.itemDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add To Cart</Button>                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
          </div>
          );
        }
}