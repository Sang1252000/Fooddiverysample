import React from 'react'
import Header from './HeaderComponent'
import Home from './HomeComponent'
import Footer from './FooterComponent'
import axios from 'axios';
import DrawerComponent from "./DrawerComponent";
import {Router,Routes,Route} from 'react-router-dom';
import Login from './LoginComponent';
import Register from './RegisterComponent';

function Main(){
    return(
        <>
        <Header/>
        <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
        </Routes>
        <Footer />
        </>
    )
}

 

export default Main;