/*
Created Date: 2021.09.08 by Haodong GU
Modified on: 
Brief Introduction: Admin Regitration Page
*/

import SignupForm from './signupForm'

const submitForm = (form) => {
    console.log(form);
}

const UserSignupForm = () => {
    return (
      <div className='signupContainer'>
        <h1>
          <p style={{fontSize:"30px"}}>Admin register</p>
        </h1>
        <SignupForm onAdd = {submitForm}/>
      </div>
    )
  };
  
  export {UserSignupForm};
