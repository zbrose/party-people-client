import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import {Link} from 'react-router-dom'
import { useState } from 'react'


export default function Welcome({events}) {


  const eventsList = events.map((event,idx)=>{
    return (
      <div key={`eventsList-${idx}`}>

        <Card style={{ width: '18rem' }}>

          <Card.Img variant="top" src="http://placekitten.com/150/150" />
          <Card.Body>

            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description} </Card.Text>
            <Card.Header>Information:</Card.Header>

            <ListGroup variant="flush">

              <ListGroup.Item>{event.city}, {event.state} {event.zipcode}</ListGroup.Item>
              <ListGroup.Item>{event.date}</ListGroup.Item>
              <ListGroup.Item>Attendees Count: {event.attendees.length} </ListGroup.Item>

            </ListGroup>

            <Link to={`/events/${event._id}`}><Button variant="primary">See Details</Button></Link>
            <Button variant="primary">RSVP</Button>

          </Card.Body>
          
        </Card>

      </div>
    )
  })
  
  return (
    
    <div>
     {eventsList}
    </div>
    
  )
}