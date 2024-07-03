/*
Created Date: 2021.10.19 by Haodong GU
Brief Introduction: edit customer details
*/

import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom'
import { DashboardTemplate } from "./dashboardComponent"
import { userAxios } from '../axiosConfig';
import Popup from 'reactjs-popup';
import Email from './emailComponent';

// icons
import { BsPencilSquare } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { AiFillVideoCamera } from 'react-icons/ai';
import { FaFileUpload } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa'

class editCustomerDetailComponent extends Component {
	
  constructor(props) {
      super(props);
      this.state = {
        info: {},
        phone:Number,
        admin:'',
        company:'',
        availableAdmins:[]
      }
  }

  componentDidMount() {
    Promise.all([
      userAxios.get('customers/'+this.props.match.params.id),
      userAxios.get('user/')
    ]).then(([res, adm]) => {
        this.setState({
          info : res.data, 
          phone: res.data.phone_number,
          admin: res.data.administrator,
          company: res.data.company,
          availableAdmins : adm.data
        })
        console.log(res)
        console.log(adm)
    })
      .catch((error) => {
        console.log(error)
      })
  }

  handleChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  handleChangeAdmin(event){
    this.setState({
      admin: event['value']
    })
    // console.log("this.state.admin = " + this.state.admin)
  }
  
  render() {
    let adminOptions = this.state.availableAdmins.map(function (admin){
      return {value: admin, label: admin}
    })
    return (
      <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
        <div style={{paddingTop:"10px"}}>
          <h1>Customer Details</h1>
          <p>Dashboard/Customer Details</p>
        </div>
        <FaRegUserCircle size={75} className="centerUserImage"/>
        <p style={{textAlign:"center", paddingTop:"10px"}}>{this.state.info.first_name} {this.state.info.last_name}</p>

        {/* functions */}
        <div className="iconContainer">
        <Link className="iconMark" style={{paddingLeft:"170px"}} to={`/`}><BsPencilSquare/></Link>
        <Popup 
          trigger= {<button style={{backgroundColor:"white", border:"0px"}}><MdEmail/></button>}
          position="bottom center" contentStyle={{width: "100%", height:"100%"}} closeOnDocumentClick>
          {close => (
            <><span>
                  <Email email={this.state.info.email}/>
              </span>
              <button className="close" style={{float:"left"}} onClick={close}>
                &times;
              </button></>
          )}
        </Popup>
        <Link className="iconMark" to={`/`}><FaTasks/></Link>
        <Link className="iconMark" to={`/`}><AiFillVideoCamera/></Link>
        <Link className="iconMark" to={`/`}><FaFileUpload/></Link>
        </div>

        {/* customer infomation */}
        <div className = "customerDetailContainer">
          <p>Create Date: {this.state.info.create_date}</p>
          <p>Last active date: {this.state.info.most_recent_visit}</p>

          {/* edit */}
					<p>Phone Number: 
            <input type="number" name="phone" value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} /></p>

          <p >Administrator:
            <Select
              value={this.state.value}
              onChange={(e) => this.handleChangeAdmin(e)}
              placeholder = {this.state.admin}
              options={adminOptions}
            />
          </p>
          <p>Associated company:
          <input type="text" name="company" value={this.state.company} onChange={this.handleChange.bind(this, 'company')} /></p>
          
          <p>Email: {this.state.info.email}</p>
          <p>Number of webpages visited: {this.state.info.AWV}</p>
          <Link className="button-small" style={{float:"right"}} to={`/customer-detail-page/id=`+this.props.match.params.id}>Back</Link> 
					<button className="button-small" style={{float:"right"}} 
          onClick={() => {
            userAxios.put('customers/updatedetails/'+this.props.match.params.id+'/'+this.state.phone+'/'+this.state.admin+'/'+this.state.company)
              .catch(async (error) => {
                console.log(error)
              })
          }}
          ><Link style={{float:"right", textDecoration:"none", color:"black"}} 
            to={`/customer-detail-page/id=`+this.props.match.params.id}>
              Save</Link></button>
        </div>


        {/* activity log */}
        <div className = "logActivityContainer">
          <table style={{border: "1px solid black", width: "100%"}}><tbody>
            <tr>
              <th style={{border: "1px solid black"}}>No</th>
              <th style={{border: "1px solid black",width:"50%"}}>Activity Name</th>
              <th style={{border: "1px solid black",width:"40%"}}>Date</th>
            </tr>
            <tr>
            <td style={{border: "1px solid black"}}>1</td>
              <td style={{border: "1px solid black",width:"50%"}}></td>
              <td style={{border: "1px solid black",width:"40%"}}></td>
            </tr>
            <tr>
              <td style={{border: "1px solid black"}}>2</td>
              <td style={{border: "1px solid black",width:"50%"}}></td>
              <td style={{border: "1px solid black",width:"40%"}}></td>
            </tr>
            <tr>
              <td style={{border: "1px solid black"}}>3</td>
              <td style={{border: "1px solid black",width:"50%"}}></td>
              <td style={{border: "1px solid black",width:"40%"}}></td>
            </tr>
          </tbody></table>
          <p style={{display:"inline"}}>Showing 3 of activity logs</p>
          <Link className="tableLinkMark" to={"/customer-registration-page"}>5</Link>
          <Link className="tableLinkMark" to={"/customer-registration-page"}>4</Link>
          <Link className="tableLinkMark" to={"/customer-registration-page"}>3</Link>
          <Link className="tableLinkMark" to={"/customer-registration-page"}>2</Link>
          <Link className="tableLinkMark" to={"/customer-registration-page"}>1</Link>
        </div>
      </div></div>
    )
  }
}

export default editCustomerDetailComponent