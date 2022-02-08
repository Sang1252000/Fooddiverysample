import React from 'react';
//import './App.css';
import ItemList from "./ItemList";
import Navbar from '../Layout/Navbar'
//import Navbar from '../Layout/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AddItem from "./AddItem";
import { Alert } from 'bootstrap';
import AddIcon from '@material-ui/icons/Add';
 
class Item extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
        isAddItem : false,
        error : null,
        response : {},
        item : {},
        isEditItem : false
    }
 
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
 
  onCreate() {
    this.setState({ isAddItem : true});
  }
 
  onFormSubmit(data) {
    
    let apiurl;
    if(this.state.isEditItem){
      apiurl = 'https://localhost:5001/api/RestaurantOwner/UpdateItem';
    }
    else{
      apiurl = 'https://localhost:5001/api/RestaurantOwner/AddItem';
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
              isAddItem : false,
              isEditItem : false
          })   
          alert("Item Added Successfully")        
      },
      error => {
        this.setState({ error });
      }
      )
  }
 
  editItem = id =>{
    const apiurl = 'https://localhost:5001/api/RestaurantOwner/GetItemById?itemId=' + id;
 
    fetch(apiurl)
      .then(res => res.json())
      .then(result => {
          this.setState({
              item : result,
              isAddItem : true,
              isEditItem : true
          })         
      },
      error => {
        this.setState({ error });
      }
      )
  }
 
  deleteItem = id =>{
    
    const apiurl = 'https://localhost:5001/api/RestaurantOwner/DeleteItem?itemId='+id;
 
    const options = {
      method : 'Delete',
    };
 
    fetch(apiurl,options)
      .then(result => {
          //window.location.href = 'http://localhost:3000/';
          alert("Item Deleted successfully");
      },
      error => {
        this.setState({ error });
      }
      )
  }
 
  render(){
 
    let ItemForm;
    if(this.state.isAddItem || this.state.isEditItem ){
        ItemForm = <AddItem onFormSubmit={this.onFormSubmit} item={this.state.item} />
    }
 
    return (
        <div className="Item">
          <Navbar />
          <br></br>
          <div className="container">
            {!this.state.isAddItem && <button className="btn btn-primary" onClick={() => this.onCreate()}><AddIcon/>Add Item</button>}
          </div>          
          {this.state.response.status === 'success' && <div><br/><Alert className="info">{this.state.response.status}</Alert></div>}
          {!this.state.isAddItem && <ItemList editItem={this.editItem} deleteItem={this.deleteItem} />}
          {ItemForm}
          {/* {this.state.error && <div>Error: {this.state.error.message}</div>} */}
          </div>
    );
  }
}
 
export default Item;