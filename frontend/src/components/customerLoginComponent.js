/*
Created Date: 2021.10.19 by Chang Yi Lee
This file defines the customer login page to track customer visited count.
Customer identifies themselves via email, 
if the email is not registered, redirect to registration page,
if the email is registered redirect to product page
*/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-st-modal';
import { userAxios } from '../axiosConfig';

export default class customerLoginComponent extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            redirect:null,
            customerEmail : ""
        };
    }

    onSubmit(e) {
        e.preventDefault()
        //check if customer exist in database
        userAxios.get('customers/byemail/'+this.state.customerEmail)
        .then(res => {
            if (res.status === 200) {
                this.setState({ redirect: "/product" })
            } 
            
        })
        .catch((error) => {emailNotRegistered()})

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{pathname:this.state.redirect, state:{customerEmail: this.state.customerEmail}}} />
        }
        return (
        <div className="registerContainer">
            <h1>Welcome to my product</h1>
            <br/>
            <form onSubmit={this.onSubmit}>
                <h4>Please enter your email to continue:</h4>
                <input type='email' name="email" required onChange={(e) => this.setState({customerEmail:e.target.value})}/>
                &nbsp;
                <input type='submit' value="enter" className='btnRegister'/>
            </form>
            
        </div>
        )
    }
}

// email is not registered, redirect to registration page
async function emailNotRegistered() {
    await Alert("The email is not registered, please register with us before continuing")
    window.location = '/register'
}
