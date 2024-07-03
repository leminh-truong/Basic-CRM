/*
Created Date: 2021.09.17 by Le Minh Truong
This file allows for registering administrators

*/
import { useState } from 'react'
import { userAxios } from '../axiosConfig';
import { authenticateAdmin } from './authenticationComponent'

const SignupForm = ({ onAdd }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
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
    window.location = '/login';
  }

  const addAdmin = async (e) => {
    e.preventDefault()
    const resp = await userAxios.post('user/signup', {
        username: username,
        password: password,
    }).then(res => {console.log(res)})
    .catch((error) => {console.log(error)})

    if(resp !== undefined){
      authenticateAdmin(resp.data);
    }

    // window.location = '/lists/'+this.state.listname
  }

  return (
    <form className='signup' onSubmit={onSubmit}>
      <div className='signup-form-control'>
        <label>Username</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='login-form-control'>
        <label>Password</label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type='submit' value='Submit'/>
    </form>
  )
}

export default SignupForm
