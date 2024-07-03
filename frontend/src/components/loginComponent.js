/*
Created Date: 2021.09.26 by Le Minh Truong
Modified on: 2021.10.04 by Le Minh Truong - authenticate administrator
Modified on: 2021.10.08 by Haodong Gu - load style
Brief Introduction: Administrator Login Component
*/

// base code from: https://github.com/bradtraversy/react-crash-2021

import { useState } from 'react'
import { userAxios } from '../axiosConfig';

import { authenticateAdmin } from "./authenticationComponent"

const LoginForm = ({ onAdd }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorStatus, setErrorStatus] = useState({hasError: false});

  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {// force fill in all fields
      alert('Please fill in all fields!')
      return
    }

    // onAdd({ firstName, lastName, email, phone, comp })
    addAdmin(e)

    setUsername('')
    setPassword('')

    // Redirect to the cutomer page
/*     window.location = '/customers'; */
  }

  const addAdmin = async (e) => {
    e.preventDefault()
    let logindata = await userAxios.post('user/login', {
        username: username,
        password: password,
    })
    .catch((err) => {
      console.log(err);
      setErrorStatus({hasError: true, error: "Server error, Please try again"});
    });



    if (logindata.data === false) {
      setErrorStatus({hasError: true, error: "Wrong email or password"});
    }

  // And sign the user in if indeed the token is returned
    else if (logindata.data !== undefined){
      // Save the token
      authenticateAdmin(logindata.data, "user");
      window.location = '/customer-all';

    }

    // window.location = '/lists/'+this.state.listname
  }

  return (
    <div className = "loginbox">
      <form className='register' onSubmit={onSubmit} style={{padding:"50px"}}>
        <div className='register-form-control'>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='register-form-control' style={{paddingBottom:"50px"}}>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='Login' className='btnRegister btnRegister-block'/>
      </form>
      {/* <form className='login' onSubmit={o.nSubmit}>
        <div className='login-form-control'>
          <label>Username: </label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br/>
        </div>
        <div className='login-form-control'>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='Submit'/>
      </form> */}
      <br />
      <div id="error">
        {errorStatus.hasError ? <p id="visible">{errorStatus.error}</p> : <p id="hidden">{errorStatus.error}</p>}
      </div>
    </div>
    
  )
}

export default LoginForm
