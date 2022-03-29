import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {useState} from 'react'



function Events({events, filter, setFilter, currentUser}) {
    
    const [key, setKey] = useState('All')
    const filterEvents = (f) => {
        setKey(f)
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
        )
    })
 

    return (
        <>
            <Tabs id="uncontrolled-tab-example" className="mb-3" activeKey={key} onSelect={(f)=>filterEvents(f)}>

                <Tab eventKey="All" title="All"><div className='flex-box'>{eventsList}</div></Tab>
                <Tab eventKey="Party" title="Party" ><div className='flex-box'>{eventsList}</div></Tab>
                <Tab eventKey="Gaming" title="Gaming" ><div className='flex-box'>{eventsList}</div></Tab>
                <Tab eventKey="Concert" title="Concert" ><div className='flex-box'>{eventsList}</div></Tab>
                <Tab eventKey="Study" title="Study" ><div className='flex-box study-tab backgroundLogin'>{eventsList}</div></Tab>
                <Tab eventKey="Other" title="Other" ><div className='flex-box'>{eventsList}</div></Tab>

            </Tabs>
        </>
              
    )
}

export default Events;