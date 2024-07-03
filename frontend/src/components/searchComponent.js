import React, { useState, useEffect } from 'react';
import { DashboardTemplate } from "./dashboardComponent"
const SearchBar = ({keyword, onChange:setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search customer by first name"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

const CustomerList = ({customerList=[]}) => {
    return (
      <>
      { customerList.map((data,index) => {
          if (data) {
            return (
              <div key={data.first_name}>
                <tr>
                <td>{data.company}</td>
                <td>{data.administrator}</td>
                <td>{data.email}</td>
                <td>{data.phone_number}</td>
                <td>{data.last_contacted.substring(0,10)}</td>
                <td>{data.lists}</td>
                </tr>
            </div>	
             )	
           }
           return null
      }) }
      </>
    );
  }

  const SearchComponent = (props) => {
    const [input, setInput] = useState('');
    const [customerListDefault, setCustomerListDefault] = useState([]);
    const [customerList, setCustomerList] = useState();
  
    const fetchData = async () => {
      return await fetch('https://crm-t60.herokuapp.com/customers')
        .then(response => response.json())
        .then(data => {
           setCustomerList(data) 
           setCustomerListDefault(data)
         });}
  
    const updateInput = async (input) => {
       const filtered = customerListDefault.filter(customer => {
        return customer.first_name.toLowerCase().includes(input.toLowerCase())
       })
       setInput(input);
       setCustomerList(filtered);
    }
  
    useEffect( () => {fetchData()},[]);
      
    return (
      <>
        <div> <DashboardTemplate /> <div className="boardheader" style={{left:"250px"}}>
            <div>
                <h1>Customers</h1><br/>
                <SearchBar 
                    input={input} 
                    onChange={updateInput}
                />
                <table className="table-list">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Administrator</th>
                                    <th>Email</th>
                                    <th>Phone number</th>
                                    <th>last_contacted</th>
                                    <th>Lists</th>
                                    <th></th>
                                </tr>
                                <tbody>
                                    <CustomerList customerList={customerList}/>
                            </tbody>
                            </thead>
                        </table>
                
            </div>
        </div></div>
      </>
     );
  }
  
  export default SearchComponent