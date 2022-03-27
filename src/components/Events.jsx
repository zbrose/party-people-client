import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import axios from 'axios';



function Events({events, filter, setFilter, currentUser}) {

    console.log(filter[0].category)

  
    const filterEvents = (e) => {
        const results = events.filter(event=>event.category === e.target.innerText)
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
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter Events By:  {filter===events ? 'All Events' : filter[0].category}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>setFilter(events)}>All Parties</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Party</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Gaming</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Concert</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Study</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Other</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div className='flex-box'>
                {eventsList}
            </div>
        </>
              
    )
}
    


export default Events;