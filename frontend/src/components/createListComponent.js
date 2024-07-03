
/*
Created Date: 2021.09.20 by Chang Yi Lee
Modified on: 2021.10.06 by Le Minh Truong - change to dynamic axios
Modified on: 2021.10.14 by Chang Yi Lee - change css for buttons and heading
This file defines the component to create a new list based on one of the three attributes :
average product views, average site views or registration date

*/
//import axios from 'axios';
import { userAxios } from '../axiosConfig';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { DashboardTemplate } from "./dashboardComponent"

/*
Display customer which satisfies the selected attributes
*/
const Customer = props => (
    <tr>
        <td>{props.customer.first_name} {props.customer.last_name}</td>
        <td>{props.customer.company}</td>
        <td>{props.customer.administrator}</td>
        <td>{props.customer.email}</td>
        <td>
            <input type='checkbox' value={props.customer._id} checked={props.isChecked} onChange={props.toAdd(props.index)}></input>
        </td>
    </tr>
)


export default class listsComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeAttb = this.onChangeAttb.bind(this);
        this.toAdd = this.toAdd.bind(this);
        this.createList = this.createList.bind(this);

        this.state = {
            redirect:null,
            listName:'',
            nameTaken:false,
            allCustomers:[],
            filteredCustomers:[],
            toAddCustomers: [],
            checkedState: [],
            APV:0,
            AWV:0,
            registration: new Date(),
            mode:0,
            showCustomers:false
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

    /*
    Change the attributes which filter the customers
    */
    onChangeAttb(e) {
        if(this.state.mode===1) {
            const filtered  = this.state.allCustomers.filter(el => el.APV >= e.target.value);
            this.setState({
                APV : e.target.value,
                filteredCustomers : filtered,
                toAddCustomers : filtered.map(({_id}) => _id),
                checkedState : new Array(filtered.length).fill(true)
            })
        }

        if(this.state.mode===2) {
            const filtered = this.state.allCustomers.filter(el => el.AWV >= e.target.value);
            this.setState({
                AWV : e.target.value,
                filteredCustomers : filtered,
                toAddCustomers : filtered.map(({_id}) => _id),
                checkedState : new Array(filtered.length).fill(true)
            })
        }

        if(this.state.mode===3) {
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

    /*
    Send http request to the server to create the list
    */
   async createList(e) {
        e.preventDefault()
        //submit listName and toAddCustomers
        try {
            await userAxios.post('lists/', {
                name:this.state.listName,
                toAddCustomers: this.state.toAddCustomers,
                creator:"admin"
            }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    this.setState({ redirect: "/lists-all" })
                } 
            })
        }

        catch(error) {
            this.setState({nameTaken: true})
            console.log(this.state.nameTaken)
            console.log(error)
        }

        
    }

    /*
    Add customers to the list of customers to be added to the list
    */
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

    /*
    Display all customers which satisfy the selected attributes
    */
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
            <div>
                <h1>Create a new list</h1><br/>
                <Link to={"/lists-all"} className="button-black">Back to List</Link>
                <br/><br/>
                <form onSubmit={this.createList}>
                    <div>
                        <label>
                            <h4>List name:</h4>
                            <input type='text' name="listName" required onChange={(e) => this.setState({listName:e.target.value})}/>
                            <p style={{display:(this.state.nameTaken ? 'block' : 'none'),color:"red"}}>*List name already exists*</p>
                        </label>
                    </div>
                    <br/>
                    <div>
                        <label>
                            <h4>Group by:</h4>
                            <input type="radio" onClick= {() => this.setState({mode: 1})} name="mode" required/> Average Product View &nbsp;
                            <input type="radio" onClick= {() => this.setState({mode: 2})} name="mode"/> Average Site View &nbsp;
                            <input type="radio" onClick= {() => this.setState({mode: 3})} name="mode"/> Registration date &nbsp;
                        </label>
                    </div>
                    <br/>
                    <div style={{display:(this.state.mode === 1 ? 'block' : 'none')}}>
                        <label>
                            <h4>Enter Average Product View:</h4>
                            <input type="number" name="APV" required={this.state.mode === 1 ? true : false} onInput={this.onChangeAttb}/>
                        </label>
                    </div>
                    <div style={{display:(this.state.mode === 2 ? 'block' : 'none')}}>
                        <label>
                            <h4>Enter Average Site View:</h4>
                            <input type="number" name="AWV" required={this.state.mode === 2 ? true : false} onInput={this.onChangeAttb} style={{border: "1px solid #000"}}/>
                        </label>
                    </div>
                    <div style={{display:(this.state.mode === 3 ? 'block' : 'none')}}>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showCustomers()}
                            </tbody>
                        </table>
                    </div>
                    <br/><br/>
                    <div>
                        <input type='submit' className="button-black"/>
                    </div>
                    
                </form>
            </div>
        </div></div>
        )
    }
}