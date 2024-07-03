/*
Created Date: 2021.09.23 by Haodong GU
Modified on: 2021.09.23 by Haodong Gu - css file for representing the webpage
Modified on: 2021.09.24 by Haodong Gu - all the high prioity stuff except email function
Modified on: 2021.10.06 by Tung Lam Nguyen - modified the appearance of the email popup box
Modified on: 2021.10.19 by Haodong Gu - edit customer details
Brief Introduction: Representing customer detail pages
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { DashboardTemplate } from "./dashboardComponent"
import { userAxios } from '../axiosConfig';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Email from './emailComponent';

// icons
import { BsPencilSquare } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { AiFillVideoCamera } from 'react-icons/ai';
import { FaFileUpload } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'

class customerDetailComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        info: {}
      }
  }

  componentDidMount() {
      // get customer details from database
      userAxios.get('customers/'+this.props.match.params.id)
        .then((res) => {
          this.setState({info : res.data})
          // console.log(this.state.info)
        })
        .catch((error) => {
          console.log(error)
          // console.log("error in componentDidMount() in Customer")
          // console.log("fail to access database")
        })
  }

  render() {
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
        {/* <Link className="iconMark" to={`/customer-registration-page`}><MdEmail/></Link> */}
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
          <p>Phone Number: {this.state.info.phone_number}</p>
          <p>Administrator: {this.state.info.administrator}</p>
          <p>Associated company: {this.state.info.company}</p>
          <p>Email: {this.state.info.email}</p>
          {/* <p>Number of pages visited: {this.state.info.APV}</p> */}
          <p style={{display:"inline"}}>Number of webpages visited: {this.state.info.AWV}</p>
          <Link className="iconMark" style={{float:"right", display:"inline"}} to={`/customer-detail-page/id=`+this.props.match.params.id+`/edit`}><FaRegEdit size={30}/></Link>
          {/* <p>First visit time: {this.state.info.first_visit}</p>
          <p>Most recent visit: {this.state.info.most_recent_visit}</p> */}
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

export default customerDetailComponent