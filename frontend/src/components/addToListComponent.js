/*
Created Date: 2021.09.20 by Chang Yi Lee
Modified on: 2021.10.06 by Le Minh Truong - change to dynamic axios
Modified on: 2021.10.14 by Chang Yi Lee - change css for buttons and heading
This file defines the component to add customers to an existing list

*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { userAxios } from '../axiosConfig';
//import axios from 'axios'
import { DashboardTemplate } from "./dashboardComponent"

/*
Display customer to be added
*/
const Customer = props => (
    <tr>
        <td>{props.customer.first_name} {props.customer.last_name}</td>
        <td>{props.customer.company}</td>
        <td>{props.customer.administrator}</td>
        <td>{props.customer.email}</td>
        <td>
            <input type='checkbox' value={props.customer._id} onChange={props.toAdd}></input>
        </td>
    </tr>
)

export default class addToListComponent extends Component {

    constructor(props) {
        super(props);
        this.toAdd = this.toAdd.bind(this);
        this.addToList = this.addToList.bind(this);
        this.state = {
            listName: this.props.match.params.name,
            allCustomers: [],
            filteredCustomers: [],
            toAddCustomers: []
        };
    }

    componentDidMount() {
        userAxios.get('customers/', {withCredentials:true})
            .then(res => {
                const customers = res.data;

                this.setState({
                    allCustomers : customers,
                    filteredCustomers : customers.filter(el => !el.lists.includes(this.state.listName))
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /*
    Add customers to the list of customers to be added to the list
    */
    toAdd(e) {
        if(e.target.checked) {
            this.setState({
                toAddCustomers : this.state.toAddCustomers.concat(e.target.value),
            })
        } else {
            this.setState({
                toAddCustomers : this.state.toAddCustomers.filter(el => el !== e.target.value),
            })
        }
    }

    /*
    Send http request to the server to add selected customers to the list
    */
    addToList(e) {
        e.preventDefault()
        //submit listName and toAddCustomers
        userAxios.post('lists/addtolist/', {
            name:this.state.listName,
            toAddCustomers: this.state.toAddCustomers
        }).then(res => {console.log(res)})
        .catch((error) => {console.log(error)})

        window.location = '/lists-all/'+this.state.listName
    }

    /*
    Display all customers that can be added to the list
    */
    showCustomers() {
        return this.state.filteredCustomers.map((customer,index) => {
            return <Customer customer={customer} toAdd={this.toAdd} key={customer._id}/>
        })
    }

    render() {
        return (
        <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
            <div>
                <h1>{this.state.listName}</h1><br/>
                <Link to={"/lists-all/"+this.state.listName} className="button-black">Back to List</Link><br/>
                <p>select customer to be added</p>
                <form onSubmit={this.addToList}>
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