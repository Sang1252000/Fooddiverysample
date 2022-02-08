import React from "react";
import Moment from 'moment';

class AddAgent extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
            agentId : '',
            restaurantId : '',
            agentName : '',                      
            agentPhone : ''            
        }

        if(props.agent){
            this.state = props.agent;
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

        if(!this.state.agentId){      
            Title = <h2>Add Agent</h2>
        }
        else{
            Title = <h2>Edit Agent</h2>
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
                                className="form-control" value={this.state.restaurantId} placeholder="RestaurantId" required/>
                            </div>
                            <div className="col-sm-6">
                                <label>AgentName</label>
                                <input type="text" name="agentName" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.agentName} placeholder="AgentName" required/>
                            </div>
                            <div className="col-sm-6">
                                <label>AgentPhone</label>
                                <input type="text" name="agentPhone" onChange={this.handleChange}                                   
                                className="form-control" value={this.state.agentPhone} placeholder="AgentPhone" required/>
                            </div>                                    
                        </div>                               
                    </div><br></br>
                    {/* <div className="form-group">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>ItemImg</label>
                                <input type="file" name="itemImg" onChange={this.handleChange}                                   
                                className="form-control" />
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
                        <input type="hidden" name="AgentId" value={this.state.AgentId} className="form-control"/>
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

export default AddAgent;