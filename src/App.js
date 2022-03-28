import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/layout/Navbar'
import Login from './components/pages/Login'
import Welcome from './components/pages/Welcome'
import Register from './components/pages/Register'
import Profile from './components/pages/Profile'
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import EventDetails from "./components/pages/EventDetails";
import axios from 'axios';

function App() {
  // state wi the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)
  // useEffect that handles localstorage if the user navigates away fro mthe page/refreshes
  useEffect(() => { 
    const token = localStorage.getItem('jwt')
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
    if (localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    // set the user state to be null
    setCurrentUser(null)
  }
  // make the auth headers
  // const options = {
  //   headers: {
  //     'Authorization': token
  //   }
  // }
  // hit the auth locked endpoint
  // axios.get(url, options)
  // axios.post(url, body, options) (same thing w put)
  const [events, setEvents]= useState([])
  const [filter, setFilter] = useState([])
  useEffect(() => { 
    async function fetchData(){
      const eventData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/events`)
      setEvents(eventData.data)
      setFilter(eventData.data)
      console.log(events)
    }
    fetchData()
  }, [])
  
   return (
    <Router>
      <Navbar handleLogout={handleLogout} currentUser={currentUser}/>

      <div className="App">
        <Routes>
          <Route 
            path='/'
            element={<Welcome events={events} setEvents={setEvents} currentUser={currentUser} filter={filter} setFilter={setFilter}/>}/>
            
        <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
          
          <Route 
            path='/'
            element={<Welcome events={events}  />}
          />
         {/* 
          <Route 
            path="/profile"
            element={<Profile />}
          /> 
          */}
           <Route 
          path='/events/:id'
          element={<EventDetails events={events} />} />
          
          <Route 
            path="/profile"
            element={currentUser ? <Profile  events={events} setEvents={setEvents} currentUser={currentUser} /> : <Navigate to="/login" />}
          />

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
