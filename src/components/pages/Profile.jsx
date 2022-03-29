import { useState, useEffect } from "react"
import axios from "axios"
import CreateEvent from "../CreateEvent"
import { Card, ListGroup } from "react-bootstrap"
import UploadImg from "../UploadImg"
import Events from "../Events"
import ProfileEvents from "../ProfileEvents"

export default function Profile({ currentUser, filter, setFilter, events, setEvents }) {
  const [msg, setMsg] = useState("")
  const [formData, setFormData] = useState({})
  const [displayImg, setDisplayImg] = useState("")
  const [formImg, setFormImg] = useState("")
  const [userInfo, setUserInfo] = useState("")
  // const [showForm, setShowForm] = (false)

  // use useEffect to get data from the back
  useEffect(() => {
    ;(async () => {
      try {
        // get token for local storage
        const token = localStorage.getItem("jwt")
        console.log("token", token)
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        // hit the auth locked endpoint
        // axios.get(url, options)
        // axios.post(url, body, options) (same thing w put)
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
          options
        )
        // set the data from the server in state
        setMsg(response.data.msg)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const getUserData = async () => {
    const userData = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`
    )
    setUserInfo(userData.data)
    // setDisplayImg(userInfo)
    setDisplayImg(userData.data.image)
  }

  //get user info
  useEffect( getUserData, [])
  
  console.log("userINFOOOO", userInfo)

  const handleSubmit = (e) => {
    // e.preventDefault()

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/events/create/${currentUser.id}`,
        formData
      )
      .then((response) => {
        setFormData({})
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api-v1/events")
      })
      .then((response) => setEvents(response.data))
      .catch(console.log)
  }

  const handleImgSubmit = async (e) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append("image", formImg)
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}/upload`,
        fd
      )
      console.log("IMAGE DATA", response.data)  
      setDisplayImg(response.data.cloudImage)
      getUserData()
    } catch (err) {
      console.log(err)
      setMsg("go cchk the server console, tere was error")
    }
  }

  return (
    <>
    <div className="flex-box">

      <Card className="" style={{ width: "25rem", margin: "0 auto"}} >
        <Card.Img
          className="img-fluid"
          variant="top"
          src={displayImg}
          alt="uploaded user profile"
        />

        {/* {displayImg && <img src={displayImg} alt="uploaded user profile" />} */}
        <h3> {currentUser.name}'s Profile</h3>

        <p>your email is {currentUser.email}</p>
        {!currentUser.image ? (
          <UploadImg
            currentUser={currentUser}
            handleImgSubmit={handleImgSubmit}
            formImg={formImg}
            setFormImg={setFormImg}
          />
        ) : (
          <Card.Img variant="top" src="http://placekitten.com/150/150" />
        )}
        {/* // <UploadImg
        //   currentUser= { currentUser }
        //   handleImgSubmit={ handleImgSubmit }
        //   formImg = {formImg}
        //   setFormImg={setFormImg}
        // /> */}
      </Card>
    </div>

    <ProfileEvents events={events} userInfo={userInfo}/>

      {/* <Events
        events={events}
        filter={filter}
        currentUser={currentUser}
        setFilter={setFilter}
      /> */}

      <Card
        style={{ width: "25rem" }}
        // className="box" */}
      >
        <CreateEvent
          handleSubmit={handleSubmit}
          eventForm={formData}
          setEventForm={setFormData}
        />
      </Card>
      {/* </Col> */}
    </>
  )
}
