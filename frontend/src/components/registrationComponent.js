/*
Created Date: 2021.09.08 by Haodong GU
Modified on: 
Brief Introduction: Regitration Page
*/

import Form from './rergistrationFormComponent'
import logo from '../images/customerPageLogo.png';

const submitForm = (form) => {
    console.log(form);
}

const CustomerRegistrationForm = () => {
    return (
      <div className='registerContainer'>
        <h1>
          <img src={logo} alt="logo" width = "150" height = "150"/>
          <p style={{fontSize:"30px"}}>Like what we do?</p>
          <p style={{fontSize:"30px"}}>Register with us today!</p>
        </h1>
        <Form onAdd = {submitForm}/>
      </div>
    )
  };
  
  export {CustomerRegistrationForm};
  