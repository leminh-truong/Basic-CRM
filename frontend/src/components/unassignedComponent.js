/*
Created Date: 2021.09.21 by Linhao Ying

This file defines the component to show all the unassigned customers
*/
import React, { Component } from 'react'
import { userAxios } from '../axiosConfig';
import { DashboardTemplate } from "./dashboardComponent"
import { Link } from 'react-router-dom'

const Customer = props => (
    <tr>
        {/* <td>{props.customers._id}</td> */}
        <td><Link to={`/customer-detail-page/id=`+props.customers._id}>{props.customers.first_name} {props.customers.last_name}</Link></td>
        {/* <td>{props.customers.last_name}</td> */}
        <td>{props.customers.company}</td>
        <td>{props.customers.administrator}</td>
        <td>{props.customers.email}</td>
        <td>{props.customers.phone_number}</td>
        {/* <td>{props.customers.create_date.substring(0,10)}</td> */}
        <td>{props.customers.last_contacted.substring(0,10)}</td>
        {/* <td>{props.customers.APV}</td>
        <td>{props.customers.AWV}</td>
        <td>{props.customers.first_visit.substring(0,10)}</td>
        <td>{props.customers.most_recent_visit.substring(0,10)}</td> */}
    </tr>
)

export default class unassignedComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {customers: []}
    }

    componentDidMount() {
        userAxios.get('customers/assignadmin/unassigned', {withCredentials:true})
            .then(res => {
                this.setState({customers : res.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    allCustomers() {
        return this.state.customers.map(currentlist => {
            return <Customer customers={currentlist} deleteCustomer={this.deleteCustomer} key={currentlist._id}/>
        })
    }

    render() {
        return (
        <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
            <div>
                <h1>Unassigned Customers</h1><br/>
                <table className="table-list">
                    <thead>
                        <tr>
                            {/* <th>customer_id</th> */}
                            <th>Name</th>
                            {/* <th>last_name</th> */}
                            <th>Company</th>
                            <th>Administrator</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            {/* <th>create_date</th> */}
                            <th>Last contacted</th>
                            {/* <th>APV</th>
                            <th>AWV</th>
                            <th>first_visit</th>
                            <th>most_recent_visit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.allCustomers()}
                    </tbody>
                </table>
            </div>
        </div></div>
        )
    }
}
