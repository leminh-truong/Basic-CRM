/*
Created Date: 2021.09.20 by Chang Yi Lee
Modified on: 2021.10.06 by Le Minh Truong - change to dynamic axios
Modified on: 2021.10.14 by Chang Yi Lee - change css for buttons and heading
This file defines the component to remove customers from an existing list

*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { userAxios } from '../axiosConfig';
//import axios from 'axios'
import { DashboardTemplate } from "./dashboardComponent"

/*
Display customer to be removed
*/
const Customer = props => (
    <tr>
        <td>{props.customer.first_name} {props.customer.last_name}</td>
        <td>{props.customer.company}</td>
        <td>{props.customer.administrator}</td>
        <td>{props.customer.email}</td>
        <td>
            <input type='checkbox' value={props.customer._id} onChange={props.toDelete}></input>
        </td>
    </tr>
)

export default class removeFromListComponent extends Component {

    constructor(props) {
        super(props);
        this.toDelete = this.toDelete.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
        this.state = {
            listName: this.props.match.params.name,
            allCustomers: [],
            filteredCustomers: [],
            toDeleteCustomers: []
        };
    }

    componentDidMount() {
        userAxios.get('customers/', {withCredentials:true})
            .then(res => {
                const customers = res.data;

                this.setState({
                    allCustomers : customers,
                    filteredCustomers : customers.filter(el => el.lists.includes(this.state.listName))
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /*
    Add customers to the list of customers to be removed from the list
    */
    toDelete(e) {
        if(e.target.checked) {
            this.setState({
                toDeleteCustomers : this.state.toDeleteCustomers.concat(e.target.value),
            })
        } else {
            this.setState({
                toDeleteCustomers : this.state.toDeleteCustomers.filter(el => el !== e.target.value),
            })
        }
    }

    /*
    Send http request to the server to remove selected customers from the list
    */
    deleteFromList(e) {
        e.preventDefault()
        //submit listName and toDeleteCustomers
        userAxios.post('lists/removefromlist/', {
            name:this.state.listName,
            toDeleteCustomers: this.state.toDeleteCustomers
        }).then(res => {console.log(res)})
        .catch((error) => {console.log(error)})

        window.location = '/lists-all/'+this.state.listName
    }

    /*
    Display all customers that can be added to the list
    */
    showCustomers() {
        return this.state.filteredCustomers.map((customer,index) => {
            return <Customer customer={customer} toDelete={this.toDelete} key={customer._id}/>
        })
    }

    render() {
        return (
            <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
                <div>
                    <h1>{this.state.listName}</h1><br/>
                    <Link to={"/lists-all/"+this.state.listName} className="button-black">Back to List</Link><br/>
                    <p>select customer to be removed from {this.state.listName}</p>
                    <form onSubmit={this.deleteFromList}>
                        <div>
                            <table className="table-list">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Administrator</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCustomers()}
                                </tbody>
                            </table>
                        </div><br/>
                        <div>
                            <input type='submit' className="button-black"/>
                        </div>
                    </form>
                </div>
            </div></div>
        )
    }
}