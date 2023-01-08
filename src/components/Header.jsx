import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/images/logo.png';

import '../style/header.css';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" id='Header'>
      <Container>
        
        <Navbar.Brand href="/">
            <img src={logo} alt='logoImg' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='home invColor'>Home</Nav.Link>
            <Nav.Link href="#" className='hotDeals invColor'>Hot Deals</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link href="#" className='arabic invColor'>العربية</Nav.Link>
            <div className="signBtns">
              <Nav.Link href="#" className='signIn'>sign in</Nav.Link>
              <Nav.Link href="#" className='signUp'>sign up</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;