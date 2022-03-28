import { useState, useEffect } from "react"
import axios from "axios"
import CreateEvent from "../CreateEvent"
import { Card, ListGroup } from "react-bootstrap"
import UploadImg from "../UploadImg"

export default function Profile({ currentUser, events, setEvents }) {
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

  //get user info
  useEffect(() => {
    const getUserData = async () => {
      const userData = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`
      )
      setUserInfo(userData.data)
    }
    
    getUserData().catch(console.error)
  }, [currentUser.id])

  console.log("userINFOOOO", userInfo)
  //zach'scard/events code
  const eventsList = events.map((event, idx) => {
    return (
      <div key={`eventsList-${idx}`}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="http://placekitten.com/150/150" />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.category} </Card.Text>
            <Card.Text>{event.description} </Card.Text>

            <ListGroup variant="flush">
              <ListGroup.Item>
                {event.city}, {event.state} {event.zipcode}
              </ListGroup.Item>
              <ListGroup.Item>{event.date}</ListGroup.Item>
              <ListGroup.Item>
                Attendees Count: {event.attendees.length}{" "}
              </ListGroup.Item>
            </ListGroup>

            {/* <Link to={`/events/${event._id}`}> */}
            {/* <Button variant="primary">See Details</Button> */}
            {/* </Link> */}
            {/* <Button onClick={() => handleClick(event._id)} variant="primary"> */}
            {/* Attend */}
            {/* </Button> */}
          </Card.Body>
        </Card>
      </div>
    )
  })

  const handleSubmit = (e) => {
    e.preventDefault()

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

      setDisplayImg(response.data.cloudImage)
    } catch (err) {
      console.log(err)
      setMsg("go cchk the server console, tere was error")
    }
  }

  return (
    <>
      <Card>
        {/* {displayImg && <img src={ displayImg } alt="" />} */}
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
      {/* <div>
      </div> */}
      {/* <h6>{msg}</h6>
      { showForm ? (

      )
      } */}
      <div className="flex-box">{eventsList}</div>
      {/* <Col className="container-fluid mt-4"> */}
      <Card
        style={{ width: "25rem" }}
        // className="box"
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
