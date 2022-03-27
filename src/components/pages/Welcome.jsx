import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Carousel from 'react-bootstrap/Carousel'
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'



export default function Welcome({events, setEvents, currentUser, filter, setFilter}) {
 
  console.log(filter)

  
  const filterEvents = (filter) => {
      const results = events.filter(event=>event.category === filter)
      setFilter(results)
  }

  const handleClick = (event) => {
      axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${event}/${currentUser.id}/attend`)
      .then(response=>console.log(response.data))
      // change button state or something so you cant click twice
      // update event state to render attendance count
    }

  const eventsList = filter.map((event,idx)=>{

      return (
        <div key={`eventsList-${idx}`}>

          <Card style={{ width: '18rem' }}>
  
            <Card.Img variant="top" src="http://placekitten.com/150/150" />
            <Card.Body>
  
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.category} </Card.Text>
              <Card.Text>{event.description} </Card.Text>
  
              <ListGroup variant="flush">
  
                <ListGroup.Item>{event.city}, {event.state} {event.zipcode}</ListGroup.Item>
                <ListGroup.Item>{event.date}</ListGroup.Item>
                <ListGroup.Item>Attendees Count: {event.attendees.length} </ListGroup.Item>
  
              </ListGroup>
  
              <Link to={`/events/${event._id}`}><Button variant="primary">See Details</Button></Link>
              <Button onClick={()=>handleClick(event._id)} variant="primary">Attend</Button>
  
            </Card.Body>
            
          </Card>
  
        </div>
      )
  })
  
  return (
    <>

    <Carousel>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="http://placekitten.com/400/150"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to The Party People App</h3>
          <p>Party</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="http://placekitten.com/400/150"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Where People Who Party...</h3>
          <p>Party Hard</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="http://placekitten.com/400/150"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>...Find Parties To Party At.</h3>
          <p>No, Harder</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
    <br />

    
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter Parties
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setFilter(events)}>All Parties</Dropdown.Item>
        <Dropdown.Item onClick={()=>filterEvents('Party')}>Parties</Dropdown.Item>
        <Dropdown.Item onClick={()=>filterEvents('Gaming')}>Gaming</Dropdown.Item>
        <Dropdown.Item onClick={()=>filterEvents('Concert')}>Concerts</Dropdown.Item>
        <Dropdown.Item onClick={()=>filterEvents('Study')}>Study Sessions</Dropdown.Item>
        <Dropdown.Item onClick={()=>filterEvents('Other')}>Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <br />

    <div className='flex-box'>
      {eventsList}
    </div>

    </>
    
  )
}
