import Carousel from 'react-bootstrap/Carousel'
import Events from '../Events'



export default function Welcome({events, currentUser, filter, setFilter}) {
 
  return (
    <>

      <Carousel className='shadow'>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="images/concert.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to The Party People App</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="images/gaming.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Where People Who Party...</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="images/playingCards.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>...Find Parties To Party At.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
      
      <br />

      <Events events={events} filter={filter} setFilter={setFilter} currentUser={currentUser}  />

    </>
    
  )
}
