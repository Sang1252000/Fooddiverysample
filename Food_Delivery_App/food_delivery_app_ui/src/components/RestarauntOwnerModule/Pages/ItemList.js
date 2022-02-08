import React from "react";
import Moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import food5 from '../../CustomerModule/food5.jpg'
 
class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            Item: [],           
            //ItemImg : 'https://localhost:5001'
        };
    }
 
    componentDidMount() {
        const apiurl = 'https://localhost:5001/api/RestaurantOwner/ViewMenu?restaurantId=1';
        fetch(apiurl)
            .then(res => res.json())
            .then(result => {
                this.setState({                              
                    Item: result
                })
            },
                (error) => {
                    this.setState({ error })
                }
            )
    }    
    
    render() {
        const { error, Item } = this.state;
        const {ItemImg} = this.state;
 
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
                                <th>ItemId</th>
                                <th>ItemName</th>
                                <th>Price</th>
                                <th>ItemDescription</th>
                                <th>ItemImg</th>
                                {/* <th>IsAvailable</th> */}
                                
                                <th style={{paddingLeft:"22px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Item.map(item => {
                                return <tr key={item.id}>
                                    <td>{item.id}</td>  
                                    <td>{item.itemName}</td>
                                    <td>{item.price}</td>
                                    <td>{item.itemDescription}</td>                         
                                    <td>
                                        <input type="image" src = {food5} alt="photo" height="150" width="120" />
                                    </td>                                   
                                    {/* <td>{item.isAvailable}</td> */}
                                    
                                    <td><button className="btn btn-info" onClick={()=> this.props.editItem(item.id)} style={{padding:"5px"}} ><EditIcon style={{padding:"3px"}}/></button>
                                   &nbsp; <button className="btn btn-danger" onClick={()=> this.props.deleteItem(item.id)} style={{padding:"5px"}} ><DeleteIcon style={{padding:"3px"}}/></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}
 
export default ItemList;