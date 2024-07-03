/*
Created Date: 2021.09.20 by Chang Yi Lee
Modified on: 2021.10.14 by Chang Yi Lee - change css for rename list popup

This file defines the component to show all the lists
with functions to delete a list and rename the list

*/
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { userAxios } from '../axiosConfig';
import { Alert, Confirm, CustomDialog, useDialog, ModalContent, ModalFooter, ModalButton } from 'react-st-modal';
import { DashboardTemplate } from "./dashboardComponent"

/*
Display data of a list
*/
const List = props => (
    <tr>
        <td><Link to={"/lists-all/"+props.list.name}>{props.list.name}</Link></td>
        <td>{props.list.size}</td>
        <td>{props.list.creator}</td>
        <td>{props.list.last_updated.substring(0,10)}</td>
        <td style={{"text-align": "center"}}>
            <button className="button-small" onClick={async () => {props.renameList(props.list._id, props.list.name, await CustomDialog(<CustomDialogContent />, {title:"rename list"}))}}> rename </button>&nbsp;
            <button className="button-small" onClick={async () => { if (await Confirm('Do you wish to delete '+props.list.name,'Delete list')) {props.deleteList(props.list.name)}}}> delete </button>
        </td>
    </tr>
)
    

export default class listsComponent extends Component {

    constructor(props) {
        super(props);
        this.deleteList = this.deleteList.bind(this);
        this.renameList = this.renameList.bind(this);
        this.state = {
            lists: []
        };
    }

    componentDidMount() {
        userAxios.get('lists', {withCredentials:true})
            .then(res => {
                this.setState({lists:res.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /*
    Send http request to the server to delete the list
    */
    deleteList(name) {
        userAxios.delete("lists/"+name)
            .then(async ()=> await userAxios.get('lists', {withCredentials:true})
                .then(res => {
                    this.setState({lists : res.data})
                })
                .catch((error) => {
                    console.log(error)
                })
            );
    }
    
    /*
    Send http request to the server to rename the list
    */
    renameList(id, oldName, newName) {
        userAxios.put("lists/"+id, {oldName: oldName, newName: newName})
            .then(async ()=> await userAxios.get('lists', {withCredentials:true})
                .then(res => {
                    this.setState({lists : res.data})
                })
                .catch(async (error) => {
                    console.log(error)
                })
            ).catch(async (error) => {
                await Alert("list name already exists")
                console.log(error)
            });
    }

    /*
    Display all the lists
    */
    allLists() {
        return this.state.lists.map(list => {
            return <List list={list} deleteList={this.deleteList} renameList={this.renameList} key={list._id}/>
        })
    }

    render() {
        return (
        <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
            <div>
                <h1>Lists</h1><br/>
                <div style={{float: "right"}}>
                    <Link to={"/createlist"} className="button">Create List</Link>
                </div>
                <br/><br/>
                <table className="table-list">
                    <thead>
                        <tr>
                            <th style={{width:"50%"}}>ListName</th>
                            <th>Size</th>
                            <th>Creator</th>
                            <th>Last Activity Date</th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.allLists()}
                    </tbody>
                </table>
            </div>
        </div></div>
        )
    }
}

/*
Dialog to prompt user enter a name if user wants to rename the list
*/
function CustomDialogContent() {
    const dialog = useDialog();
  
    const [value, setValue] = useState();
  
    return (
    	<div className='container'>
            <ModalContent>
                <label>
                    Enter new name: &nbsp;
                    <input type="text" onChange={(e) => {setValue(e.target.value);}}/>
                </label>
                </ModalContent>
            <ModalFooter>
                <ModalButton onClick={() => {dialog.close(value);}}>
                Enter
                </ModalButton>
            </ModalFooter>
            
      </div>
    );
  }