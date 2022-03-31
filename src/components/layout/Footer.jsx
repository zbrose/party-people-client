import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'



function Footer() {
    return ( 
        <>
        <div className='footer BebasNeue' id="footer">
    
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
                eventKey="github">GitHub</Nav.Link>
            </Nav>
            <Nav defaultActiveKey="/home" className="flex-column">
                 <h3>Bryan Nguyen</h3>
                 <Nav.Link href="https://www.linkedin.com/in/brnguy/" eventKey="LinkedIn">LinkedIn</Nav.Link>
                <Nav.Link href="https://github.com/brnguy" eventKey="GitHub">GitHub</Nav.Link>
            </Nav>
            <Nav defaultActiveKey="/home" className="flex-column">
                <h3>Grace Sung</h3>
                <Nav.Link href="https://www.linkedin.com/in/chanhee-grace-sung/" eventKey="LinkedIn">LinkedIn</Nav.Link>
                <Nav.Link href="https://github.com/kokopuffz" eventKey="GitHub">GitHub</Nav.Link>
            </Nav>
            <Nav defaultActiveKey="/home" className="flex-column">
                <h3>Zach Brose</h3>
                <Nav.Link href="https://www.linkedin.com/in/zach-brose-668a9891/" eventKey="LinkedIn">LinkedIn</Nav.Link>
                <Nav.Link href="https://github.com/zbrose" eventKey="GitHub">GitHub</Nav.Link>
            </Nav>
            
        </div>
        </>
     )
}

export default Footer;  