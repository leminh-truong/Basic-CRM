/*
Created Date: 2021.10.06 by Tung Lam Nguyen
Modified on: 2021.10.07 by Tung Lam Nguyen - Fit to coding standard and fix the look of the form
Modified on: 2021.10.08 by Tung Lam Nguyen - Fixed the content email tag to text area and adjusted the height
Modified on: 2021.10.14 by Chang Yi Lee - change css for buttons and heading
Modified on: 2021.10.19 by Tung Lam Nguyen - Fixed the autofill for sender and fixed the bug for not sending email
This file defines the component to send email to multiple customers in a list

*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { userAxios } from '../axiosConfig';
import { DashboardTemplate } from "./dashboardComponent"

/*
Display customer to be added to the list of email
*/
const Customer = props => (
    <tr>
        <td>{props.customer.first_name} {props.customer.last_name}</td>
        <td>{props.customer.company}</td>
        <td>{props.customer.administrator}</td>
        <td>{props.customer.email}</td>
        <td>
            <input type='checkbox' value={props.customer.email} onChange={props.toEmail}></input>
        </td>
    </tr>
)

/*
The main component
*/
export default class emailToListComponent extends Component {

    constructor(props) {
        super(props);
        this.toEmail = this.toEmail.bind(this);
        this.addToList = this.addToList.bind(this);
        this.state = {
            listName: this.props.match.params.name,
            allCustomers: [],
            filteredCustomers: [],
            toEmailCustomers: [],
            sender : "admin@sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org",
            subject : "",
            message : "",
            file : null
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
    Set the emails to be sent
    */
    toEmail(e) {
        if(e.target.checked) {
            this.setState({
                toEmailCustomers : this.state.toEmailCustomers.push(e.target.value),
            })
        } else {
            this.setState({
                toEmailCustomers : this.state.toEmailCustomers.filter(el => el !== e.target.value),
            })
        }
    }

    /*
    Set the subject field
    */
    handleChangeSubject(e){
        this.setState({
            subject : e.target.value,
        })
    }

    /*
    Set the message field
    */
    handleChangeMessage(e){
        this.setState({
            message : e.target.value,
        })
    }

    /*
     Set file to be sent
     */
    handleFileChange(e){
        this.setState({
            file: e.target.files[0]
        })
    }
    /*
    Send http request to the server to send emails to the selected customers
    */
    addToList(e) {
        e.preventDefault()

        if (!this.state.message || !this.state.subject || !this.state.toEmailCustomers) {// force fill in all fields
            alert('Please fill in all fields!')
            return
          }
        
        if (this.state.toEmailCustomers.length === 0) {// force fill in all fields
            alert('Please select the customers to send email!')
            return
          }
        //Send the request with set fields
         const formdata = new FormData();
        formdata.append('sender', this.state.sender)
        formdata.append('receiver', this.state.toEmailCustomers.join())
        formdata.append('subject',this.state.subject)
        formdata.append('message',this.state.message)
        formdata.append('file', this.state.file)

        userAxios.post('/email', formdata, { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {console.log(res)})
        .catch((error) => {console.log(error)})

        alert("Message sent sucessfully")
        console.log("Sender: " + this.state.sender);
        console.log("Receiver: " + this.state.toEmailCustomers);
        console.log("Subject: " + this.state.subject);
        console.log("Message: " + this.state.message);
        // Afterward, redirects to the list page
        window.location = '/lists-all/'+this.state.listName
    }

    /*
    Display all customers that can be emailed
    */
    showCustomers() {
        return this.state.filteredCustomers.map((customer,index) => {
            return <Customer customer={customer} toEmail={this.toEmail} key={customer._id}/>
        })
    }

    /*
    Render the page with the customer check boxes and form
    */
    render() {
        return (
        <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
            <div>
                <h1>{this.state.listName}</h1><br/>
                <Link to={"/lists-all/"+this.state.listName} className="button-black">Back to List</Link><br/>
                <p>select customers to be sent</p>
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
                    </div>
                    <div className="registerContainer" style={{background:"#d5f5e3", fontWeight:"bolder"}}>
                            <div className='register-form-control'>
                                <center><p><b>Write a new email!</b></p></center>
                            </div>
                            <div className='register-form-control'>
                                <span>From: <input className="textInput" type="text" id="sender" name="sender" value="admin@sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org"/></span>
                            </div>
                            <div className='register-form-control'>
                                <span>Subject: <input className="textInput" type="text" id="subject" name="subject" onChange={(e) => this.handleChangeSubject(e)} /></span>
                            </div>
                            <div className='register-form-control'>
                                <p>Content</p>
                                <textarea className="textInput" style={{height:"160px"}} type="text" id="message" name="message" onChange={(e) => this.handleChangeMessage(e)}/>
                            </div>
                            <div className='field'>
                                <label>File</label>
                                <br></br>
                                <br></br>
                                <input
                                    type="file"
                                    onChange={(e) => this.handleFileChange(e)}
                                />
                            </div>
                            <input type='submit' style={{border:"solid 1px black"}} value='Send' className='btnRegister btnRegister-block'/>
                    </div>
                </form>
            </div>
        </div></div>
        )
    }
}