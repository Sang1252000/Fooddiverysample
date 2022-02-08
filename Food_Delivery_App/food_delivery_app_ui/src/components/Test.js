import React, { Component } from 'react'
import axios from 'axios'
class Test extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName:'',
			lastName: '',
			phoneNumber: '',
            emailId:'',
            userPassword:'',
            userAddress:'',
            city:'',
            userRole:false,
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('https://localhost:5001/api/User/AddUser', this.state )
         
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

    

	render() {
		const { firstName, lastName, phoneNumber,emailId,userPassword,userAddress,city,userRole} = this.state
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="text"
							name="lastName"
							value={lastName}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						<input
							type="text"
							name="phoneNumber"
							value={phoneNumber}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						<input
							type="text"
							name="emailId"
							value={emailId}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						<input
							type="text"
							name="userPassword"
							value={userPassword}
							onChange={this.changeHandler}
						/>
					</div>
                    
                    <div>
						<input
							type="text"
							name="userAddress"
							value={userAddress}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						<input
							type="text"
							name="city"
							value={city}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
                        <input
                        type='checkbox'
                        name="userRole"
                        value={userRole}
                        onChange={this.changeHandler}
                        />
                    </div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default Test