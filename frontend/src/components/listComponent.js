/*
Created Date: 2021.09.20 by Chang Yi Lee
Modified on: 2021.10.06 by Le Minh Truong - change to dynamic axios
Modified on: 2021.10.06 by Tung Lam Nguyen - added popup email box and fixed its appearance
Modified on: 2021.10.07 by Tung Lam Nguyen - replaced the email popup box with a link to the send email to list page
This file defines the component to show all the customers in a list

*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { userAxios } from '../axiosConfig';
import { DashboardTemplate } from "./dashboardComponent"

/*
Display customer in the list
*/
const Customer = props => (
    <tr>
        <td style={{width:"100%"}}>{props.customer.first_name} {props.customer.last_name}</td>
        <td>{props.customer.company}</td>
        <td>{props.customer.administrator}</td>
        <td>{props.customer.email}</td>
    </tr>
)


export default class listComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {customers: []};
    }

    componentDidMount() {
        userAxios.get('lists/'+this.props.match.params.name, {withCredentials:true})
            .then(res => {
                this.setState({customers : res.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /*
    Display all customers in the list
    */
    allCustomers() {
        return this.state.customers.map(customer => {
            return <Customer customer={customer} key={customer._id}/>
        })
    }

    render() {
        return (
            <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
                <div>
                    <h1>{this.props.match.params.name}</h1><br/>
                        <div><Link to={"/lists-all"} className="button-black" >Back to Lists</Link></div>
                        <div style={{float: "right"}}> 
                            <Link to={"/lists-all/"+this.props.match.params.name+"/emailToList"} className="button">Send Email</Link>&nbsp;
                            <Link to={"/lists-all/"+this.props.match.params.name+"/add"} className="button">Add customer</Link>&nbsp;
                            <Link to={"/lists-all/"+this.props.match.params.name+"/delete"} className="button">Delete customer</Link>
                        </div>
                    <br/><br/>
                    <table className="table-list">
                        <thead>
                            <tr>
                                <th style={{width:"50%"}}>Name</th>
                                <th>Company</th>
                                <th>Administrator</th>
                                <th>Email</th>
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
