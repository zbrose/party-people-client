import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {useState} from 'react'



function Events({events, filter, setFilter, currentUser}) {

    const filterEvents = (f) => {
        if (f==='All'){
            setFilter(events)
        } else {
            const results = events.filter(event=>event.category === f)
            console.log('results', results)
            setFilter(results)
        }
    }
  
    // const handleClick = (event) => {
    //     axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${event}/${currentUser.id}/attend`)
    //     .then(response=>console.log(response.data))
    //     // change button state or something so you cant click twice
    //     // update event state to render attendance count
    //   }

    const eventsList = filter.map((event,idx)=>{

        return (
        // <div key={`eventsList-${idx}`}>

            <Card key={`eventList-${idx}`}  style={{ width: '18rem' }}>
                <div className="shadow">
                    <div className="shadow">

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

                        <Button href={`/events/${event._id}`} className='btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm' variant="primary">See Details</Button>
                        {/* <Button onClick={()=>handleClick(event._id)} variant="primary">Attend</Button> */}

                    </Card.Body>
                        
                    </div>
                </div>
            </Card>

        // </div>
        )
    })
    console.log('filtered events', eventsList)

    // const categories = ['Party','Gaming','Concerts','Study','Other']
    // const filteredEvents = categories.forEach(category => {
    //     return( 
    //         <Tab eventKey={category} title={category}>
    //             {/* {eventsList.filter(event => {
    //                 return(
    //                     event.category === category
    //                     ) 
    //                 })} */}
    //         </Tab>

    //     )
    // })
    
    const [key, setKey] = useState('All')

    return (
        <>
            {/* <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter Events By:  {filter===events ? 'All Events' : (filter[0] ? filter[0].category : 'No Events Found')}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>setFilter(events)}>All Events</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Party</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Gaming</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Concert</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Study</Dropdown.Item>
                    <Dropdown.Item onClick={filterEvents}>Other</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}

            <Tabs id="uncontrolled-tab-example" className="mb-3" activeKey={key} onSelect={(f)=>filterEvents(f)}>
                <Tab eventKey="All" title="All">{eventsList}</Tab>
                <Tab eventKey="Party" title="Party" >{eventsList}</Tab>
                <Tab eventKey="Gaming" title="Gaming" >{eventsList}</Tab>
                <Tab eventKey="Concert" title="Concert" >{eventsList}</Tab>
                <Tab eventKey="Study" title="Study" >{eventsList}</Tab>
                <Tab eventKey="Other" title="Other" >{eventsList}</Tab>
            </Tabs>

            {/* <div className='flex-box'>
                {eventsList}
            </div> */}
        </>
              
    )
}

export default Events;