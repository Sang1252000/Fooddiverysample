import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Restaurants from './Restaurants';
import ViewCart from './ViewCart';
import MyOrders from './MyOrders';
import Logout from './Logout';
import { NavLink } from 'react-router-dom';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CustomerUpdateDetails from './UpdateCustomer';
import axios from 'axios';
import UserProfile from './UserProfile';
export default function CustomerHome(props) {
  const [value, setValue] = React.useState('1');
  const [itemCount, setItemCount] = React.useState(0);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const[userDetails,setUserDetails]=useState([]);
  useEffect(() => {
  axios.get(`https://localhost:5001/api/User?emailId=${id}`)
  .then((response) => {
    console.log(response.data)
    setUserDetails(response.data);
  })
}, [])
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Restaraunts" value="1" />
            <Tab label="View Cart" value="2" />
            <Tab label="My Orders" value="3" />
            <Tab label="UserProfile" value="4" />
            <Tab label="Update User Profile" value="5" />
            <Tab label="Logout" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1">{<Restaurants id={userDetails.userId} />}</TabPanel>
        <TabPanel value="2">{<ViewCart/>}</TabPanel>
        <TabPanel value="3">{<MyOrders id={userDetails.userId}/>}</TabPanel>
        <TabPanel value="4">{<UserProfile name={userDetails.firstName} email={userDetails.emailId} phone={userDetails.phoneNumber} city={userDetails.city}/>}</TabPanel>
        <TabPanel value="5">{<CustomerUpdateDetails id={userDetails.userId}/>}</TabPanel>
        <TabPanel value="6">
        <NavLink className="nav-link" exact to="/">
          Logout
        </NavLink>
        </TabPanel>
      </TabContext>
    </Box>
  );
}