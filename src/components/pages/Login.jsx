import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Link, Navigate } from "react-router-dom"
import { Card } from "react-bootstrap"

export default function Login({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [msg, setMessage] = useState("")

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      // post to the backend with the form data to login
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`,
        form
      )
      // decode the token that is sent to use
      const { token } = response.data
      const decoded = jwt_decode(token)
      // save the token in localstorage
      localStorage.setItem("jwt", token)
      // set the app state to the logged in user
      setCurrentUser(decoded)
    } catch (err) {
      // handle errors suchs as wrong credentials
      if (err.response.status === 400) {
        console.log(err.response.data)
        setMessage(err.response.data.msg)
      }
      console.log(err)
    }
  }

  // navigate to the user's profile if currentUser is not null
  if (currentUser) return <Navigate to="/profile" />

  return (
    <div className="backgroundLogin">
      <Card className="login-card mx-auto  row d-flex justify-content-center align-items-center h-100 ">
        <div className="container-fluid shadow">
          <div className="row no-gutter shadow">
            <div className="col-md-6 d-none d-md-flex bg-image shadow"></div>
            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4 BebasNeue ">Welcome Back!</h3>
                      <p className="text-muted mb-4 LilitaOne">
                        Login to Party!🥳
                      </p>
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-3 BebasNeue">
                          <label htmlFor="email">Email:</label>
                          <input
                            id="inputEmail"
                            type="email"
                            placeholder="Email address"
                            required=""
                            autoFocus=""
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            value={form.email}
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                        </div>
                        <div className="mb-3 BebasNeue">
                          <label htmlFor="password">Password:</label>
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            onChange={(e) =>
                              setForm({ ...form, password: e.target.value })
                            }
                            value={form.password}
                          />
                        </div>
                        <div className="d-grid gap-2 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm BebasNeue"
                          >
                            Sign in
                          </button>
                        </div>

                        <div className="text-center d-flex justify-content-between mt-4">
                          <p className="LoR">
                            Don't have an account?
                            <button className="LoRButton">
                              <Link to="/register">Create One</Link>
                            </button>{" "}
                          </p>

                          <p>
                            {msg
                              ? `the server has a message for you: ${msg}`
                              : ""}
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
