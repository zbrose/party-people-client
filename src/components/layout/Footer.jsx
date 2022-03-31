import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'



function Footer() {
    return ( 
        <>
        <div className='footer BebasNeue'>
    
            <div>
                <h2>The Party People App</h2>
                <h5>Where People Who Party Find Parties To Party At</h5>
                <Navbar.Brand href="#">Back To Top</Navbar.Brand>

            </div>
        
                <h3 style={{width: '8rem', margin: '5px'}}>Meet The Developers: </h3>
            
            <Nav defaultActiveKey="/home" className="flex-column">
                <h3>Triston J. Palacios</h3>
                <Nav.Link href="https://www.linkedin.com/in/tristonpalacios/" eventKey="LinkedIn">LinkedIn</Nav.Link>
                <Nav.Link href="https://github.com/tristonpalacios"
                eventKey="github">Github</Nav.Link>
            </Nav>
            <Nav defaultActiveKey="/home" className="flex-column">
                 <h3>Bryan Nguyen</h3>
                 <Nav.Link eventKey="link-1">LinkedIn</Nav.Link>
                <Nav.Link eventKey="link-2">Github</Nav.Link>
            </Nav>
            <Nav defaultActiveKey="/home" className="flex-column">
                <h3>Grace Sung</h3>
                <Nav.Link eventKey="link-1">LinkedIn</Nav.Link>
                <Nav.Link eventKey="link-2">Github</Nav.Link>
            </Nav>
            <Nav defaultActiveKey="/home" className="flex-column">
                <h3>Zach Brose</h3>
                <Nav.Link eventKey="link-1">LinkedIn</Nav.Link>
                <Nav.Link eventKey="link-2">Github</Nav.Link>
            </Nav>
            
        </div>
        </>
     )
}

export default Footer;  