/*
Created Date: 2021.09.13 by Le Minh Truong
Modified on: 2021.10.06 by Tung Lam Nguyen - Fixed the style and look of the email form
Modified on: 2021.10.19 by Tung Lam Nguyen - Fixed the bug that caused the email not able to send
This file defines the component to send email to customers

*/

import { sub } from 'date-fns';
import { useState } from 'react'
import { userAxios } from '../axiosConfig';
import '../styles/Email.scss'

const SendEmail = (props) => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const onSubmit = (e) => {
    e.preventDefault()

    if (!message || !subject) {// force fill in all fields
      alert('Please fill in all fields!')
      return
    }

    handleSubmit(e)

    setSubject('')
    setMessage('')
    setFile(null)

    alert('Email sent!')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formdata = new FormData();
    formdata.append('sender', "admin@sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org")
    formdata.append('receiver', props.email)
    formdata.append('subject',subject)
    formdata.append('message',message)
    formdata.append('file', file)

    for (var pair of formdata.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    userAxios.post('email/',  formdata, { 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } ).then(res => {console.log(res)})
    .catch((error) => {console.log(error)})

    console.log("Sender: " + "admin@sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org");
    console.log("Receiver: " + props.email);
    console.log("Subject: " + subject);
    console.log("Message: " + message);
    console.log(file)

    // window.location = "/customer-all"
  }

  return (
    <div className="box">
        
        <div className='register-form-control'>
            <center><p><b>Write a new email!</b></p></center>
        </div>
        <form onSubmit={onSubmit}>
            <div className='field'>
                <label>From</label>
                <input
                className="textInput"
                type='text'
                value="admin@sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org"
                />
            </div>
            <div className='field'>
                <label>Receiver</label>
                <input
                className="textInput"
                type='text'
                value={props.email}
                />
            </div>
            <div className='field'>
                <label>Subject</label>
                <input
                className="textInput"
                type='text'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                />
            </div>
            <div className='field'>
                <label>Content</label>
                <textarea
                className="textInput"
                style={{height:"160px"}}
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className='field'>
                <label>File</label>
                <br></br>
                <br></br>
                <input
                type="file"
                onChange={(e) => {setFile(e.target.files[0])}}
                />
            </div>
            <input type='submit' style={{border:"solid 1px black"}} value='Send' className='btnRegister btnRegister-block'/>
        </form>
    </div>
  )
}

export default SendEmail
