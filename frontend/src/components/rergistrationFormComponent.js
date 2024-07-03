/*
Created Date: 2021.09.08 by Haodong GU
Modified on: 2021.09.23 by Haodong GU - communicating with database
Modified on: 2021.10.19 by Chang Yi Lee - redirect to product page after registration
Brief Introduction: Regitration form component
*/

// base code from: https://github.com/bradtraversy/react-crash-2021

import { useState } from 'react'
import { userAxios } from '../axiosConfig';
import { Redirect } from 'react-router-dom';

const Form = ({ onAdd }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comp, setComp] = useState('')
  const [redirect, setRedirect] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !phone) {// force fill in all fields
      alert('Please fill in all fields!')
      return
    }

    // onAdd({ firstName, lastName, email, phone, comp })
    addCustomer(e)
    
  }

  const addCustomer = (e) => {
    e.preventDefault()
    userAxios.post('customers/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phone,
        company: comp,
        phone: phone
    }).then((res) => {
      if (res.status === 200) {
        alert('Thank you for your registration!')
        setRedirect(true)
      }
    })
    .catch((error) => {alert('Email already exists')})

    // window.location = '/lists/'+this.state.listname
  }

  if (redirect) {
    return <Redirect to={{pathname:"/product", state:{customerEmail: email}}} />
  } else {
    return (
      <form className='register' onSubmit={onSubmit}>
        <div className='register-form-control'>
          <label>First name</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='register-form-control'>
          <label>Last name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='register-form-control'>
          <label>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='register-form-control'>
          <label>Phone Number</label>
          <input
            type='text'
            pattern="[0-9]+"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='register-form-control'>
          <label> Accociated Company </label>
          <input
            type='text'
            placeholder='(Optional)'
            value={comp}
            onChange={(e) => setComp(e.target.value)}
          />
        </div>
        <input type='submit' value='Register' className='btnRegister btnRegister-block'/>
      </form>
    )
  }
}
  

export default Form
