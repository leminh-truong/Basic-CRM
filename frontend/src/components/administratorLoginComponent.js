/*
Created Date: 2021.10.05 by Haodong GU
Brief Introduction: Admin login page
*/

import logo from '../images/admin.jpg';
import LoginForm from './loginComponent'

const submitForm = (form) => {
  console.log(form);
}

const AdminLogin = () => {
  return (
    <div className='registerContainer'>
      <img src={logo} alt="logo" width = "150" height = "150" style={{display:"inline-block"}}/>
      <h1 style={{display:"inline", paddingLeft:"70px"}}>Administrator Login</h1>
      <LoginForm onAdd = {submitForm}/>
    </div>
  )
}

export default AdminLogin
