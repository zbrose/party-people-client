import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {useState} from 'react'
import dayjs from 'dayjs';



function Events({events, filter, setFilter}) {
    
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
               

                    <Card.Img variant="top" src="http://placekitten.com/150/150" />
                    <Card.Body>

                        <Card.Title style={{fontSize:'25px'}}>{event.title}</Card.Title>
                        <Card.Text>{event.category} </Card.Text>
                        <Card.Text>{event.description} </Card.Text>

                        <ListGroup variant="flush">

                        <ListGroup.Item>{event.city}, {event.state} {event.zipcode}</ListGroup.Item>
                        <ListGroup.Item>{dayjs(event.date).format('MMMM D, YYYY')}</ListGroup.Item>
                        <ListGroup.Item>Attendees Count: {event.attendees.length} </ListGroup.Item>

                        </ListGroup>

                        <Button href={`/events/${event._id}`} className='btn-block text-uppercase mb-2 rounded-pill shadow-sm' variant="outline-dark">See Details</Button>

                    </Card.Body>
                        
                
              
            </Card>
        </div>
        )
    })
 

    return (
        <>
            <h3 className='flex-box'>Filter Parties By: </h3>
            <Tabs id="uncontrolled-tab-example" className="mb-3 flex-tab" activeKey={key} onSelect={(f)=>filterEvents(f)}>

                <Tab eventKey="All" title="All"><div className='flex-box tab-style'>{eventsList}</div></Tab>
                <Tab eventKey="Party" title="Party" ><div className='flex-box tab-style'>{eventsList}</div></Tab>
                <Tab eventKey="Gaming" title="Gaming" ><div className='flex-box tab-style'>{eventsList}</div></Tab>
                <Tab eventKey="Concert" title="Concert" ><div className='flex-box tab-style'>{eventsList}</div></Tab>
                <Tab eventKey="Study" title="Study" ><div className='flex-box study-tab tab-style'>{eventsList}</div></Tab>
                <Tab eventKey="Other" title="Other" ><div className='flex-box tab-style'>{eventsList}</div></Tab>

            </Tabs>
        </>
              
    )
}

export default Events;