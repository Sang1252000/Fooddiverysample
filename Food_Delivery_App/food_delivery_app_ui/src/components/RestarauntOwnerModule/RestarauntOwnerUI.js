import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "./AddItemComponent";
import AddAgent from "./AddAgentComponent";
import UpdateRestaurant from "./UpdateRestarauntComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Logout from "./LogoutComponent";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OwnerHome from "./OwnerHomeComponent";
function RestarauntOwnerUI() {
  return (
    <OwnerHome/>
  );
}
export default RestarauntOwnerUI;
