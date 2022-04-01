import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavbarComp from "./components/layout/NavbarComp"
import Login from "./components/pages/Login"
import Welcome from "./components/pages/Welcome"
import Register from "./components/pages/Register"
import Profile from "./components/pages/Profile"
import { useState, useEffect, useRef } from "react"
import jwt_decode from "jwt-decode"
import EventDetails from "./components/pages/EventDetails"
import axios from "axios"
import Map from "./components/pages/Map"
import CreateEvent from "./components/pages/CreateEvent"
import Footer from "./components/layout/Footer"
import About from "./components/pages/About"

function App() {
  // state wi the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect that handles localstorage if the user navigates away fro mthe page/refreshes
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    // if a toekn is found, log the user in, otherwise make sure they are logged out
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])
  // logout handleer function that deletes a token from localstorage
  const handleLogout = () => {
    // remove the token from local storage
    if (localStorage.getItem("jwt")) localStorage.removeItem("jwt")
    // set the user state to be null
    setCurrentUser(null)
  }
  
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState([])

  const fetchData = async () => {
    const eventData = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/events`
    )
    setEvents(eventData.data)
    setFilter(eventData.data)
  }

  useEffect(fetchData, [])

  return (
    <Router>
      <NavbarComp handleLogout={handleLogout} currentUser={currentUser} />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                events={events}
                setEvents={setEvents}
                currentUser={currentUser}
                filter={filter}
                setFilter={setFilter}
              />
            }
          />

          <Route
            path="/register"
            element={
              <Register
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/events/:id"
            element={
              <EventDetails
                events={events}
                Map={Map}
                currentUser={currentUser}
                fetchData={fetchData}
              />
            }
          />

          <Route path="/events/new" element={<CreateEvent />} />

           <Route 
          path='/events/new'
          element={<CreateEvent />} />
          
           <Route
             path="/profile"
             element={
               currentUser ? (
                 <Profile
                   events={events}
                   setEvents={setEvents}
                   currentUser={currentUser}
                   filter={filter}
                   setFilter={setFilter}
            />
            ) : (
              <Navigate to="/login" />
            )} />
          <Route
           path='/about'
           element={<About />}
          />
         </Routes>
       </div>
       <Footer />
     </Router>
   )
}

export default App
