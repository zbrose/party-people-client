import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'


export default function NavbarComp({ handleLogout, currentUser }) {
  // if the user is logged in

  const loggedIn = (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>

          <Navbar.Brand href="/">Party People</Navbar.Brand>

            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/"><span onClick={handleLogout}>Log Out</span></Nav.Link>
            </Nav>
  
            {currentUser ? 
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Welcome Back, <a href="/profile">{currentUser.name}</a>
              </Navbar.Text>
            </Navbar.Collapse> : 'no user found'}

        </Container>
      </Navbar>   
    </>
  )

  const loggedOut = (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Party People</Navbar.Brand>
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