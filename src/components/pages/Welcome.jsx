
import Carousel from 'react-bootstrap/Carousel'

import Events from '../Events'



export default function Welcome({events, currentUser, filter, setFilter, setEvents}) {
 
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

      <Events events={events} filter={filter} setFilter={setFilter} currentUser={currentUser} setEvents={setEvents} />

    </>
    
  )
}
