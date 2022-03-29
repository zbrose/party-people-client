import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Link,Navigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'

export default function Register({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    passwordConfirmation: ''
  })
  const [msg, setMsg] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (form.password === form.passwordConfirmation) {
        // remove unneeded data in the form pre-request
        delete form.passwordConfirmation
        // do the axios since the passwords match
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
        // get the token from the response
        const { token } = response.data
        // set the token in local storage
        localStorage.setItem('jwt', token)
        // decode the token
        const decoded = jwt_decode(token)
        // log the user in 
        setCurrentUser(decoded)
      } else {
        setMsg('the two passwords you entered do not match 🥴')
      }
    } catch (err) {
      if (err.response.status === 409) {
        setMsg(err.response.data.msg)
      } else {
        console.log(err)
      }
    }
  }

  // navigate away if the user logs in
  if (currentUser) return <Navigate to="/profile" />

  return (
    <div>
      {/* <h3>Become a User @ User App!</h3> */}

      {/* <p>{msg}</p> */}

      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder='enter your email...'
        />
        <label htmlFor="name">Name:</label>
        <input 
          type="text"
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder='enter your name...'
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password"
          id="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder='enter your password...'
        />

        <label htmlFor="passwordConfirmation">Confirmation:</label>
        <input 
          type="password"
          id="passwordConfirmation"
          value={form.passwordConfirmation}
          onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
          placeholder='enter your confirmation...'
        />

        <input type="submit" /> */}
      {/* </form> */}
      <div className="backgroundLogin">
    <Card className="row d-flex justify-content-center align-items-center h-100 ">
      
        <div className="container-fluid shadow">
          <div className="row no-gutter shadow">
            <div className="col-md-6 d-none d-md-flex bg-imageTwo shadow"></div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4 BebasNeue">Sign Up!</h3>
                      <p className="text-muted mb-4 LilitaOne">
                       I heard you like to PARTY!🥳
                      </p>
                      <form onSubmit={handleSubmit}>
                      <div className="mb-3 BebasNeue">
                        <label htmlFor="name">Name:</label>
                          <input
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            type="text"
                            id="name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder='enter your name...'
                          />
                        </div>
                        <div className="mb-3 BebasNeue">
                        <label htmlFor="email ">Email:</label>
                          <input
                            id="inputEmail"
                            type="email"
                            placeholder="Email address"
                            required=""
                            autoFocus=""
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            value={form.email}
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="mb-3 BebasNeue">
                        <label htmlFor="password ">Password:</label>
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            value={form.password}
                          />
                        </div>
                       
                        <div className="mb-3 BebasNeue">
                        <label htmlFor="passwordConfirmation">Confirm Password:</label>
                          <input
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            type="password"
                            id="passwordConfirmation"
                            value={form.passwordConfirmation}
                            onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
                            placeholder='enter your confirmation...'
                          />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm BebasNeue"
                          >
                            Sign Up
                          </button>
                        </div>

                        <div className="text-center d-flex justify-content-between mt-4">
                        <p className="LoR">Already have an account?<button className="LoRButton"><Link to="/login">login</Link></button> </p> 
                        <p>{msg ? `the server has a message for you: ${msg}` : ""}</p>    
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* </form> */}

    
    </Card>
    </div>
    </div>
    
  )
}