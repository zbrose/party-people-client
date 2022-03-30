import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'



 
export default function NavbarComp({ handleLogout, currentUser }) {
  // if the user is logged in

  const loggedIn = (
    <>

      <Navbar className='BebasNeue navbar' bg="light" variant="light">
        <Container>

          <Navbar.Brand style={{fontSize:'4rem'}} href="/">Party People</Navbar.Brand>

            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/"><span onClick={handleLogout}>Log Out</span></Nav.Link>
            </Nav>
  
            {currentUser ? 
            <Navbar.Collapse className="justify-content-end">
              <Button className='create-event-button' variant="outline-dark">Create Event</Button>
              <Navbar.Text>
                Welcome Back, <a href="/profile">{currentUser.name}!</a>
              </Navbar.Text>
            </Navbar.Collapse> : 'no user found'}

        </Container>
      </Navbar>   
    </>
  )

  const loggedOut = (
    <>
      <Navbar className='BebasNeue navbar' bg="light" variant="light">
        <Container>
          <Navbar.Brand style={{fontSize:'4rem'}} href="/">Party People</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Sign-Up</Nav.Link>
            <Nav.Link href="/login"><span onClick={handleLogout}>Log In</span></Nav.Link>
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