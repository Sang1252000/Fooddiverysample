import  React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import axios from 'axios';
import MyOrdersCard from './MyOrdersCard';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function MyOrders() {
    const [orderList, setOrdersList] = useState([]);
    useEffect(() => {
      axios.get(`https://localhost:5001/api/Customer/ViewOrdersOfCustomer?UserId=1`)
          .then((response) => {
              setOrdersList(response.data);
          })
  }, [])
  if (orderList==null)
  return <div>OOOps!!!You have not yet Ordered anything</div>;
  return (
    <Box sx={{ minWidth: 275 }}>
         {
               orderList.map((order,index)=> {
                return(
                    <Card variant="outlined">
                        <MyOrdersCard id={order.orderId} date={order.orderDate} status={order.orderStatus} amount={order.totalPrice}/>
                    </Card>
             )
             })
            }
    </Box>
    
  );
}