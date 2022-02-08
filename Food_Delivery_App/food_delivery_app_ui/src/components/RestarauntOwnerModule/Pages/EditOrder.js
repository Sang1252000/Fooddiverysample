import React from "react";
import Moment from 'moment';

class EditOrder extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
            orderId : '',
            // agentId : '',
            // userId : '',                      
            // paymentMode : '',
            // totalPrice : '',
            orderStatus : ''           
        }

        if(props.order){
            this.state = props.order;
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

        const file = event.target.files;
        if(file != null)
        {           
            const uploadedFile = file.item(0);
            var reader = new FileReader();
            reader.readAsDataURL(uploadedFile);            
            reader.onload = () => {            
                const supportObj = {
                fileName: uploadedFile.name,
                fileBase64: reader.result.toString().substr(reader.result.toString().indexOf('base64,') + 7),
                fileType: uploadedFile.type
                };   
                const Base = supportObj.fileBase64; 
                this.setState({
                    [name] : Base
                })
            };                             
        }
        else    
        {
            this.setState({
                [name] : value
            })
        }           
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state)
        this.setState(this.initialState)
    }

    render() {
        let Title;

        if(this.state.orderId){      
            Title = <h2>Edit Order</h2>
        }
        
        return(
            <div className="container">
                {Title}<br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>OrderStatus</label>
                                <input type="text" name="orderStatus" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.orderStatus} placeholder="OrderStatus" required/>
                            </div>                                                             
                        </div>                               
                    </div><br></br>
                  
                    <div className="form-group">
                        <input type="hidden" name="OrderId" value={this.state.OrderId} className="form-control"/>
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

export default EditOrder;