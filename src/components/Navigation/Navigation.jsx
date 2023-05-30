import './Navigation.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';


const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

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
                            <Link to="/places/create">Create places</Link>
                        </Nav.Link>


                        {
                            user
                                ?
                                <>
                                    <Nav.Link as="span" onClick={logout}>Cerrar sesion</Nav.Link>

                                    <Nav.Link as="span">
                                        <Link to={`/profile/${user._id}`}>Hola {user.name}</Link>
                                    </Nav.Link>

                                </>
                                :
                                <>
                                    <Nav.Link as="span">
                                        <Link to="/login">Login</Link>
                                    </Nav.Link>

                                    <Nav.Link as="span">
                                        <Link to="/signup">Singup</Link>
                                    </Nav.Link>
                                </>
                        }






                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigation