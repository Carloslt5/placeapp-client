import './Navigation.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Places App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link as="span">
                            <Link to="/places">Places</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/community">Community</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/login">Login</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/signup">Singup</Link>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigation