import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'



 
export default function NavbarComp({ handleLogout, currentUser }) {
  // if the user is logged in
  console.log(currentUser)
  const loggedIn = (
    <>
      <Navbar className='BebasNeue navbar' >
        <Container>

        <Navbar.Brand href="/">
        <img
          alt="party people artwork gif"
          src="images/Untitled_Artwork 9.gif"
          width="250"
          height="200"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
          {/* <Navbar.Brand style={{fontSize:'4rem', color: 'white'}} href="/">Party People</Navbar.Brand> */}

            <Nav className="me-auto">
              <Nav.Link style={{color: 'white'}} href="/">Home</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/profile">Profile</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/"><span onClick={handleLogout}>Log Out</span></Nav.Link>
            </Nav>
  
            {currentUser ? 
            <Navbar.Collapse className="justify-content-end">
              <Button href="/events/new" className='create-event-button' variant="outline-light">Create Event</Button>
              <Navbar.Text style={{color: 'white'}}  >
                Welcome Back, <a style={{color: 'white'}} href="/profile">{currentUser.name}!</a>
              </Navbar.Text>
            </Navbar.Collapse> : 'no user found'}

        </Container>
      </Navbar>   
    </>
  )

  const loggedOut = (
    <>
      <Navbar className='BebasNeue navbar'>
        <Container>
          <Navbar.Brand style={{fontSize:'4rem', color: 'white'}} href="/">Party People</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={{color: 'white'}}  href="/">Home</Nav.Link>
            <Nav.Link style={{color: 'white'}}  href="/register">Sign-Up</Nav.Link>
            <Nav.Link style={{color: 'white'}}  href="/login"><span onClick={handleLogout}>Log In</span></Nav.Link>
          </Nav>
        </Container>
      </Navbar>   
    </>
  )

  return (
      <>
      {currentUser ? loggedIn : loggedOut}
      </>
  )
}