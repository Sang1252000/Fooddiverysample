import React from 'react';
//import './App.css';
//import AgentList from "./Pages/AgentList";
import OrderList from './OrderList';
import Navbar from '../Layout/Navbar'
//import Navbar from './Layout/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import EditOrder from "./EditOrder";
import { Alert } from 'bootstrap';
import AddIcon from '@material-ui/icons/Add';

class Order extends React.Component{
  
    constructor(props){
      super(props);
      this.state = {
          //isAddOrder : false,
          error : null,
          response : {},
          order : {},
          isEditOrder : false
      }
  
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }
  
   
    onFormSubmit(data) {
      
      let apiurl;
      if(this.state.isEditOrder){
        apiurl = 'https://localhost:5001/api/RestaurantOwner/UpdateOrderStatus';
      }
      
      const options = {
         method : 'POST',
         body : JSON.stringify(data),
         headers : {
          "content-type": "application/json",
          "accept": "application/json"
        }
      };
  
      fetch(apiurl,options)
        .then(res => res.json())
        .then(result => {
            this.setState({
                response : result,
                //isAddOrder : false,
                isEditOrder : false
            })          
        },
        error => {
          this.setState({ error });
        }
        )
    }
  
    editOrder = orderId =>{
      const apiurl = 'https://localhost:5001/api/RestaurantOwner/GetOrderById?orderId=' + orderId;
  
      fetch(apiurl)
        .then(res => res.json())
        .then(result => {
            this.setState({
                order : result,
                //isAddOrder : true,
                isEditOrder : true
            })          
        },
        error => {
          this.setState({ error });
        }
        )
    }
  
       render(){
  
      let OrderForm;
      if(this.state.isEditOrder ){
          OrderForm = <EditOrder onFormSubmit={this.onFormSubmit} order={this.state.order} />
      }
  
      return (
          <div className="Order">
            <Navbar />
            <br></br>
            {/* <div className="container">
              {!this.state.isAddOrder && <button className="btn btn-primary" onClick={() => this.onCreate()}><AddIcon/>Add Order</button>}
            </div>           */}
            {this.state.response.status === 'success' && <div><br/><Alert className="info">{this.state.response.status}</Alert></div>}
            {<OrderList editOrder={this.editOrder} />}
            {OrderForm}
            {/* {this.state.error && <div>Error: {this.state.error.message}</div>} */}
            </div>
      );
    }
  }
  
  export default Order;