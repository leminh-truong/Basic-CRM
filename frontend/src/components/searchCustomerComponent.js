/*
Created Date: 2021.09.21 by Linhao Ying

This file defines the component to search a customer based on customer name, 
administrator name and registration date.
*/
import { userAxios } from '../axiosConfig';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { DashboardTemplate } from "./dashboardComponent"
import { Link } from 'react-router-dom'

/*
Display customer which satisfies the selected attributes
*/
const Customer = props => (
    <tr>
        <td>{props.customer.first_name} {props.customer.last_name}</td>
        <td>{props.customer.company}</td>
        <td>{props.customer.administrator}</td>
        <td>{props.customer.email}</td>
    </tr>
)


export default class searchCustomerComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeAttb = this.onChangeAttb.bind(this);

        this.state = {
            redirect:null,
            first_name:'',
            last_name:'',
            company:'',
            administrator:'',
            email:'',
            filter:'',
            allCustomers:[],
            filteredCustomers:[],
            registration: new Date(),
            mode:0,
            showCustomers:false,
            checkedState: [],
        }
    }

    componentDidMount() {
        userAxios.get('customers/', {withCredentials:true})
            .then(res => {
                this.setState({allCustomers:res.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onChangeAttb(e) {
        if(this.state.mode===1) {
            this.setState({ filter: e.target.value});
            const { filter, allCustomers } = this.state;
            const lowercasedFilter = filter.toLowerCase();
            const filteredData = allCustomers.filter(item => {
                return Object.keys(item).some(key =>
            typeof item[key] === "string" &&(item.first_name.toLowerCase().includes(lowercasedFilter)
            ||item.last_name.toLowerCase().includes(lowercasedFilter)||item.administrator.toLowerCase().includes(lowercasedFilter))
          );
        })
        this.setState({
            filteredCustomers : filteredData,
        });
        }
        if(this.state.mode===2) {
            const pickeddate = moment(e).format();
            const filtered = this.state.allCustomers.filter(el => el.create_date >= pickeddate);
            console.log(this.state.allCustomers)
            console.log(filtered)
            console.log(moment(e).format())
            this.setState({
                registration : e,
                filteredCustomers : filtered,
                toAddCustomers : filtered.map(({_id}) => _id),
                checkedState : new Array(filtered.length).fill(true)
            })
        }

        this.setState({showCustomers : true})
    }

/*    handleChange = event => {
        this.setState({ filter: event.target.value });
      };*/

      toAdd = (i) => (e) => {
        const updatedcheckedState = this.state.checkedState.map((el, index) => index === i ? !el : el);

        if(e.target.checked) {
            console.log(e.target.value)
            this.setState({
                toAddCustomers : this.state.toAddCustomers.concat(e.target.value),
                checkedState : updatedcheckedState
            })
        } else {
            console.log(e.target.value)
            this.setState({
                toAddCustomers : this.state.toAddCustomers.filter(el => el !== e.target.value),
                checkedState : updatedcheckedState
            })
        }
        console.log(this.state.toAddCustomers)
    }

      showCustomers() {
        return this.state.filteredCustomers.map((customer,index) => {
            return <Customer customer={customer} index={index} isChecked={this.state.checkedState[index]} toAdd={this.toAdd} key={customer._id}/>
        })
    }
    
      render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
    
        return (
            <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
                 <h1>Search</h1><br/>
                 <div style={{float: "right"}}>
                    <Link to={"/unassigned-customer"} className="button">Unassiged Customers</Link>
                </div>
                        <div>
                            <label>
                                <h4>Group by:</h4>
                                <input type="radio" onClick= {() => this.setState({mode: 1})} name="mode" required/> Search by name/administrator name&nbsp;
                                <input type="radio" onClick= {() => this.setState({mode: 2})} name="mode"/> Registration date &nbsp;
                            </label>
                        </div>
                        <br/>
                        <div style={{display:(this.state.mode === 1 ? 'block' : 'none')}}>
                            <label>
                            <div>
                                <h4>Enter by Name/Administrator Name:</h4>
                                <input required={this.state.mode === 1 ? true : false} onChange={this.handleChange} onInput={this.onChangeAttb}/>
                                </div>
                            </label>
                        </div>
                        <div style={{display:(this.state.mode === 2 ? 'block' : 'none')}}>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={this.state.registration} onChange={this.onChangeAttb}/>
                        </div>
                        <div style={{display:(this.state.showCustomers ? 'block' : 'none')}}>
                            <br/>
                            <table className="table-list">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Administrator</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCustomers()}
                                </tbody>
                            </table>
                        </div>
                        <br/><br/>
                </div>
            </div>
            )
        }
    }
    
