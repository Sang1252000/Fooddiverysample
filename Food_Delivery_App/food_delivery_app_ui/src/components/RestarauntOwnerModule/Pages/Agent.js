import React from 'react';
//import './App.css';
//import AgentList from "./Pages/AgentList";
import AgentList from './AgentList';
import Navbar from '../Layout/Navbar'
//import Navbar from './Layout/Navbar';
import { BrowserRouter as Router,Routes } from 'react-router-dom';
import AddAgent from "./AddAgent";
import { Alert } from 'bootstrap';
import AddIcon from '@material-ui/icons/Add';

class Agent extends React.Component{
  
    constructor(props){
      super(props);
      this.state = {
          isAddAgent : false,
          error : null,
          response : {},
          agent : {},
          isEditAgent : false
      }
  
      this.onFormSubmit = this.onFormSubmit.bind(this);
    }
  
    onCreate() {
      this.setState({ isAddAgent : true});
    }
  
    onFormSubmit(data) {
      
      let apiurl;
      if(this.state.isEditAgent){
        apiurl = 'https://localhost:5001/api/RestaurantOwner/UpdateAgentDetails';
      }
      else{
        apiurl = 'https://localhost:5001/api/RestaurantOwner/AddAgentDetails';
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
                isAddAgent : false,
                isEditAgent : false
            })          
        },
        error => {
          this.setState({ error });
        }
        )
    }
  
    editAgent = agentId =>{
      const apiurl = 'https://localhost:5001/api/RestaurantOwner/GetAgentById?agentId=' + agentId;
  
      fetch(apiurl)
        .then(res => res.json())
        .then(result => {
            this.setState({
                agent : result,
                isAddAgent : true,
                isEditAgent : true
            })          
        },
        error => {
          this.setState({ error });
        }
        )
    }
  
    // deleteItem = itemId =>{
      
    //   const apiurl = 'https://localhost:44343/api/RestaurantOwner/DeleteItem?itemId=' + itemId;
  
    //   const options = {
    //     method : 'Delete',
    //   };
  
    //   fetch(apiurl,options)
    //     .then(result => {
    //         window.location.href = 'http://localhost:3000/';
    //     },
    //     error => {
    //       this.setState({ error });
    //     }
    //     )
    // }
  
  
    render(){
  
      let AgentForm;
      if(this.state.isAddAgent || this.state.isEditAgent ){
          AgentForm = <AddAgent onFormSubmit={this.onFormSubmit} agent={this.state.agent} />
      }
  
      return (
          <div className="Agent">
             <Navbar />
            <br></br>
            <div className="container">
              {!this.state.isAddAgent && <button className="btn btn-primary" onClick={() => this.onCreate()}><AddIcon/>Add Agent</button>}
            </div>          
            {this.state.response.status === 'success' && <div><br/><Alert className="info">{this.state.response.status}</Alert></div>}
            {!this.state.isAddAgent && <AgentList editAgent={this.editAgent} />}
            {AgentForm}
            {/* {this.state.error && <div>Error: {this.state.error.message}</div>} */}
            </div>
      );
    }
  }
  
  export default Agent;