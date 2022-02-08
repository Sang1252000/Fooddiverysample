import React from "react";
import Moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

class AgentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            Agent: []           
        };
    }

    componentDidMount() {
        const apiurl = 'https://localhost:5001/api/RestaurantOwner/ViewDeliveryAgentDetails?restaurantId=1';
        fetch(apiurl)
            .then(res => res.json())
            .then(result => {
                this.setState({                              
                    Agent: result
                })
            },
                (error) => {
                    this.setState({ error })
                }
            )
    }    
    
    render() {
        const { error, Agent } = this.state;

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        }
        else {
            return (
                <div className="container"><br></br>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>AgentId</th>
                                <th>AgentName</th>
                                <th>AgentPhone</th>
                                <th style={{paddingLeft:"22px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr key={Agent.agentId}>
                                    <td>{Agent.agentId}</td>  
                                    <td>{Agent.agentName}</td>
                                    <td>{Agent.agentPhone}</td>                     

                                    <td><button className="btn btn-info" onClick={()=> this.props.editAgent(Agent.agentId)} style={{padding:"5px"}} ><EditIcon style={{padding:"3px"}}/></button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default AgentList;