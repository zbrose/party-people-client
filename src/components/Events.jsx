import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {useState} from 'react'
import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc')
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)


function Events({events, filter, setFilter, currentUser}) {
    
    const [key, setKey] = useState('All')
    const filterEvents = (f) => {
        setKey(f)
        console.log(f)
        if (f==='All'){
            setFilter(events)
        } else {
            const results = events.filter(event=>event.category === f)
            console.log('results', results)
            setFilter(results)
        }
    }
  

    const eventsList = filter.map((event,idx)=>{

        return (
        <div key={`eventsList-${idx}`} className='cardContainer'>

            <Card style={{ width: '18rem' }}>
               

                    <Card.Img variant="top" src={event.image} />
                    <Card.Body>

                        <Card.Title style={{fontSize:'25px'}}>{event.title}</Card.Title>
                        <Card.Text>{event.category} </Card.Text>
                        {/* <Card.Text>{event.description} </Card.Text> */}

                        <ListGroup variant="flush">

                        <ListGroup.Item>{event.city}, {event.state} {event.zipcode}</ListGroup.Item>
                        <ListGroup.Item>{dayjs.tz(event.date, "America/New_York").format('MMMM D, YYYY')}</ListGroup.Item>
                        <ListGroup.Item>Attendees: {event.attendees.length} </ListGroup.Item>

                        </ListGroup>

                        <Button href={currentUser ? `/events/${event._id}` : '/login' } className='btn-block text-uppercase mb-2 rounded-pill shadow-sm' variant="outline-dark">{currentUser ? 'See Details' : 'Log In to see details'}</Button>

                    </Card.Body>
                        
                
              
            </Card>
        </div>
        )
    })
    console.log(eventsList)
 

    return (
        <>
         
            <Tabs id="uncontrolled-tab-example" className="mb-3 flex-tab" activeKey={key} onSelect={(f)=>filterEvents(f)}>

                <Tab eventKey="All" title="All"><div className='flex-box tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>
                <Tab eventKey="Party" title="Party" ><div className='flex-box tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>
                <Tab eventKey="Gaming" title="Gaming" ><div className='flex-box tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>
                <Tab eventKey="Concert" title="Concert" ><div className='flex-box tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>
                <Tab eventKey="Comedy" title="Comedy" ><div className='flex-box tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>
                <Tab eventKey="Study" title="Study" ><div className='flex-box study-tab tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>
                <Tab eventKey="Other" title="Other" ><div className='flex-box tab-style'>{!eventsList[0] ? <h3 className='white'>No Events Listed In This Category</h3> : eventsList}</div></Tab>

            </Tabs>
        </>
              
    )
}

export default Events;