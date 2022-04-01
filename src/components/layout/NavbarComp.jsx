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
          src="https://cdn.discordapp.com/attachments/829614700815319060/959198724301680690/Untitled_Artwork_14.gif"
          width="250"
          height="200"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
          {/* <Navbar.Brand style={{fontSize:'4rem', color: 'white'}} href="/">Party People</Navbar.Brand> */}
              <Nav.Link className='pink-font' href="/">Events</Nav.Link>
              <Nav.Link className='pink-font' href="/profile">Profile</Nav.Link>
              <Nav.Link className='pink-font' href="/about">About The App</Nav.Link>
              <Nav.Link className='pink-font' href="/"><span onClick={handleLogout}>Log Out</span></Nav.Link>
            {currentUser ? 
            <Navbar.Collapse className="justify-content-end pink-font">
              <Button href="/events/new" className='create-event-button pink-font' >Create Event</Button>
              <Navbar.Text style={{color: 'rgb(13,102,250)'}}  >
                Welcome Back, <a style={{color: 'rgb(13,102,250)'}} href="/profile">{currentUser.name}!</a>
              </Navbar.Text>
            </Navbar.Collapse> : 'no user found'}
        </Container>
      </Navbar>   
    </>
  )

  const loggedOut = (
    <>
      <Navbar className='BebasNeue navbar '>
        <Container>
        <Navbar.Brand href="/">
        <img
          alt="party people artwork gif"
          src="images/Untitled_Artwork 14.gif"
          width="250"
          height="200"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
          {/* <Navbar.Brand style={{fontSize:'4rem', color: 'white'}} href="/">Party People</Navbar.Brand> */}
          <div className='container'>
            <div style={{display: 'flex'}}>
            <Nav.Link className='pink-font' href="/">Events</Nav.Link>
            <Nav.Link className='pink-font' href="/register">Sign-Up</Nav.Link>
            <Nav.Link className='pink-font' href="/about">About The App</Nav.Link>
            <Nav.Link className='pink-font' href="/login"><span onClick={handleLogout}>Log In</span></Nav.Link>
            </div>
          </div>
  
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