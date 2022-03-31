import Carousel from 'react-bootstrap/Carousel'
import Events from '../Events'



export default function Welcome({events, currentUser, filter, setFilter}) {
 
  return (
    <>

      <Carousel className='shadow BebasNeue' style={{maxWidth: "2000px",margin: "0 auto"}}>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="images/concert.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{fontSize: '5em'}}>The Party People App</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="images/gaming.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 style={{fontSize: '5em'}}>Where People Who Party...</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="images/playingCards.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 style={{fontSize: '5em'}}>...Find Parties To Party At</h3>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
      
      <br />

      <Events events={events} filter={filter} setFilter={setFilter} currentUser={currentUser}  />

    </>
    
  )
}
