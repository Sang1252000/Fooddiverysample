import React from "react";
import Moment from 'moment';

class AddItem extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
            id : '',
            restaurantId : '',
            itemName : '',                      
            price : '',
            itemDescription : '',
            itemImg : 'item.jpg'//,
            //isAvailable : ''
        }

        if(props.item){
            this.state = props.item;
        }
        else{      
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;        

        // const file = event.target.files;
        // if(file != null)
        // {           
        //     const uploadedFile = file.item(0);
        //     var reader = new FileReader();
        //     reader.readAsDataURL(uploadedFile);            
        //     reader.onload = () => {            
        //         const supportObj = {
        //         fileName: uploadedFile.name,
        //         fileBase64: reader.result.toString().substr(reader.result.toString().indexOf('base64,') + 7),
        //         fileType: uploadedFile.type
        //         };   
        //         const Base = supportObj.fileBase64; 
        //         this.setState({
        //             [name] : Base
        //         })
        //     };                             
        // }
        // else    
        // {
        //     this.setState({
        //         [name] : value
        //     })
        // }           
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        let Title;

        if(!this.state.id){      
            Title = <h2>Add Item</h2>
        }
        else{
            Title = <h2>Edit Item</h2>
        }
        
        return(
            <div className="container">
                {Title}<br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>RestaurantId</label>
                                <input type="text" name="restaurantId" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.restaurantId} placeholder="RestaurantId" required autoComplete="off"/>
                            </div>
                            <div className="col-sm-6">
                                <label>ItemName</label>
                                <input type="text" name="itemName" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.itemName} placeholder="ItemName" required/>
                            </div>
                            <div className="col-sm-6">
                                <label>Price</label>
                                <input type="text" name="price" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.price} placeholder="Price" required/>
                            </div> 
                            <div className="col-sm-6">
                                <label>ItemDescription</label>
                                <input type="text" name="itemDescription" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.itemDescription} placeholder="ItemDescription" required/>
                            </div>                                    
                        </div>                               
                    </div><br></br>
                    {/* <div className="form-group">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>ItemImg</label>
                                <input type="file" name="itemImg" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.itemImg}/>
                            </div>                                                               
                        </div>   
                    </div><br></br>  */}
                    {/* <div className="form-group">
                        <div className="row">
                        <div className="col-sm-6">
                                <label>IsAvailable</label>
                                <input type="text" name="isAvailable" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.isAvailable} placeholder="IsAvailable" required/>
                            </div>                                                               
                        </div>   
                    </div><br></br> */}
                    <div className="form-group">
                        <input type="hidden" name="id" value={this.state.id} className="form-control"/>
                        <button className="btn btn-success" type="submit">Save</button>
                        <a href="/">
                        <button className="btn btn-default" type="button">Cancel</button>
                        </a>                                               
                    </div>      
                </form>              
            </div>
        )
    }
}

export default AddItem;