import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestarauntOwnerUI from "./components/RestarauntOwnerModule/RestarauntOwnerUI";
import Main from "./components/MainComponent";
import { CartProvider } from "react-use-cart";
import CustomerHome from "./components/CustomerModule/CustomerHome";
import './App.css';
function App() {
  return (
    //app component
    <CartProvider>
    <Router>
      <Routes>
        <Route exact path="*" element={<Main/>} />
        <Route path="/restarauntOwner" element={<RestarauntOwnerUI/>} />
        <Route path="/Customer" element={<CustomerHome/>}  />
      </Routes>
    </Router>
    </CartProvider>
  );
}
export default App;