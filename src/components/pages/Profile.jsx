import { useState, useEffect } from "react"
import axios from "axios"
import CreateEvent from "../CreateEvent"
import { Card, ListGroup, Col } from "react-bootstrap"
import UploadImg from "../UploadImg"

export default function Profile({ currentUser, events, setEvents }) {
  const [msg, setMsg] = useState("")
  const [formData, setFormData] = useState({})
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

  return (
    <>
      <h3>{currentUser.name}'s Profile</h3>

      <p>your email is {currentUser.email}</p>

      <UploadImg currentUser={currentUser}/>

      <h4>The message from the auth locked route is:</h4>

      {/* <h6>{msg}</h6>
      { showForm ? (

      )
      } */}
      {/* <Col className="container-fluid mt-4"> */}
      <div
        className="card"
        style={{ width: "25rem" }}
        // className="box"
      >
        <CreateEvent
          handleSubmit={handleSubmit}
          eventForm={formData}
          setEventForm={setFormData}
        />
      </div>
      {/* </Col> */}

      <div className="flex-box">{eventsList}</div>
    </>
  )
}
