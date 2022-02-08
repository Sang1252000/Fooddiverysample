import  React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import restaraunt from '../RestarauntOwnerModule/restaraunt.jpg';
import Item from './ItemComponent';
export default function RestarauntCard(props) {
    const[isclicked,setclicked]=useState(false);
  return (
    <div>
                          <Card sx={{ maxWidth: 345 }}>
                            <CardMedia component="img" height="140" image={restaraunt} alt="green iguana"/>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{props.restaurantName}</Typography>
                                <Typography variant="body2" color="text.secondary">{props.city}</Typography>
                                <Typography variant="body2" color="text.secondary">{props.phoneNumber}</Typography>
                                </CardContent>
                                <CardActions>
                                <Button onClick={() => {setclicked(true)}}>
                                      View Menu
                                  </Button>
                                  <Button onClick={() => {setclicked(false)}}>
                                      Exit Menu
                                  </Button>
                                </CardActions>
                            </Card>
                            <div>
                              {
                               isclicked  && <Item id={props.restaurantId} userId={props.userId}/>
                              }
                          </div>
    </div>
  );
}