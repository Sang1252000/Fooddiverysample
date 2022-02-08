import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddItem from './AddItemComponent';
import UpdateRestaurant from './UpdateRestarauntComponent';
import AddAgent from './AddAgentComponent';
import AddRestaurant from './AddRestarauntComponent';
import ChangeOrderDeliveryStatus from './ChangeOrderStatus';
import Agent from './Pages/Agent';
import Item from './Pages/Item';
import Home from '../HomeComponent';
import Order from './Pages/Order';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import UserProfile from './UserProfile';
export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const[userDetails,setUserDetails]=useState([]);
  const[restarauntId,setRestarauntId]=useState(0);
  useEffect(() => {
  axios.get(`https://localhost:5001/api/User?emailId=${id}`)
  .then((response) => {
    console.log(response.data)
    setUserDetails(response.data);
  })
}, [])
axios.get(`https://localhost:5001/api/RestaurantOwner/GetRestaurantIdByUserId?userId=${userDetails.userId}`)
  .then((response) => {
    console.log(response.data)
    setRestarauntId(response.data);
  })

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Add Restaraunt" value="1" />
            <Tab label="Update Restaraunt" value="2" />
            <Tab label="Agent" value="3" />
            <Tab label="Item" value="4" />
            <Tab label="Change Order Status" value="5" />
            <Tab label="User Profile" value="6" />
            <Tab label="Logout" value="7"/>
          </TabList>
        </Box>
        <TabPanel value="1">{<AddRestaurant userId={userDetails.userId}/>}</TabPanel>
        <TabPanel value="2">{<UpdateRestaurant userId={userDetails.userId} restarauntId={restarauntId}/>}</TabPanel>
        <TabPanel value="3">{<Agent/>}</TabPanel>
        <TabPanel value="4">{<Item/>}</TabPanel>
        <TabPanel value="5">{<Order/>}</TabPanel>
        <TabPanel value="6">{<UserProfile name={userDetails.firstName} email={userDetails.emailId} phone={userDetails.phoneNumber} city={userDetails.city}/>}</TabPanel>
        <TabPanel value="7">
        <NavLink className="nav-link" exact to="/">
          Logout
        </NavLink>
        </TabPanel>
      </TabContext>
    </Box>
  );
}