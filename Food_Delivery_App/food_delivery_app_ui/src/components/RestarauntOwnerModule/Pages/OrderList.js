import React from "react";
import Moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            Order: []           
        };
    }

    componentDidMount() {
        const apiurl = 'https://localhost:5001/api/RestaurantOwner/ViewOrderDetails?restaurantId=1';
        fetch(apiurl)
            .then(res => res.json())
            .then(result => {
                this.setState({                              
                    Order: result
                })
            },
                (error) => {
                    this.setState({ error })
                }
            )
    }    
    
    render() {
        const { error, Order } = this.state;

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
                                <th>OrderId</th>
                                <th>AgentId</th>
                                <th>UserId</th>
                                <th>PaymentMode</th>
                                <th>TotalPrice</th>
                                <th>OrderStatus</th>
                                <th style={{paddingLeft:"22px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Order.map(order => {
                                return <tr key={order.orderId}>
                                <td>{order.orderId}</td> 
                                <td>{order.agentId}</td>  
                                <td>{order.userId}</td>
                                <td>{order.paymentMode}</td> 
                                <td>{order.totalPrice}</td>                     
                                <td>{order.orderStatus}</td>                     
                                <td><button className="btn btn-info" onClick={()=> this.props.editOrder(order.orderId)} style={{padding:"5px"}} ><EditIcon style={{padding:"3px"}}/></button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default OrderList;