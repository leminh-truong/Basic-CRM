/*
Created Date: 2021.10.19 by Chang Yi Lee
This file defines the dummy product page to track customer visited count
If customer is not logged in, redirect to login page
*/
import React, { Component } from 'react'
import { Alert } from 'react-st-modal';
import { userAxios } from '../axiosConfig';

export default class productPageComponent extends Component {

    constructor(props) {
        super(props);
        try {
            this.state = {
                customerEmail : this.props.location.state.customerEmail
            };
        } catch(e) {
            this.state = {
                customerEmail : ""
            };
        }
        
    }

    componentDidMount() {
        if (!this.state.customerEmail) {
            noEmail();
        } else {
            //update visitted count
            userAxios.put('customers/visittedcount/'+this.state.customerEmail)
            .then()
            .catch((error) => {console.log(error)})
            }
    }

    render() {
        return (
        <h1>You are on product page</h1>
        )
    }
}

async function noEmail() {
    await Alert("Please enter your email before continuing")
    window.location = '/'
}