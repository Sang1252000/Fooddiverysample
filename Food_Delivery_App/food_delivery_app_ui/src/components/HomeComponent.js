import React,{useState, useEffect} from 'react'
//import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "./pizza.jpeg";
import "./Home.css";
function Home(){
    return (
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
          <div className="headerContainer">
            <h1> Foodivery </h1>
            <p> WE HAVE WINGS</p>
            <Link to="/login">
              <button> ORDER NOW </button>
            </Link>
          </div>
        </div>
      );
}

export default Home;