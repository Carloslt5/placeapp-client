import './Navigation.css'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    return (

        <Navbar collapseOnSelect expand="lg" className='navbarBg' sticky="top" >
            <Container>
                <Navbar.Brand href="/" className='mx-0'>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mx-auto">
                        <Nav.Link as="span">
                            <Link to="/places">Places</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/community">Community</Link>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <Link to="/places/create">Create places</Link>
                        </Nav.Link>
                    </Nav>

                    {
                        user
                            ?
                            <Nav>
                                <NavDropdown title={user.name} id="collasible-nav-dropdown">

                                    <NavDropdown.Item>
                                        <Nav.Link as="span">
                                            <Link to={`/profile/${user._id}`}>My Profile</Link>
                                        </Nav.Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item >
                                        <Nav.Link as="span">
                                            <Link to={`/profile/${user._id}/myplaces`}>My places</Link>
                                        </Nav.Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item >
                                        <Nav.Link as="span">
                                            <Link to={`/profile/${user._id}/myfavourites`}>My favourites</Link>
                                        </Nav.Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        <Nav.Link as="span" onClick={logout}>Cerrar sesion</Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link as="span">
                                    <Link to="/login">Login</Link>
                                </Nav.Link>

                                <Nav.Link as="span">
                                    <Link to="/signup">Singup</Link>
                                </Nav.Link>
                            </Nav>

                    }

                </Navbar.Collapse>
            </Container>
        </Navbar >


        // <Navbar bg="dark" variant="dark" expand="lg">
        //     <Container>
        //         <Navbar.Brand href="/">Places App</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">

        //                 <Nav.Link as="span">
        //                     <Link to="/places">Places</Link>
        //                 </Nav.Link>

        //                 <Nav.Link as="span">
        //                     <Link to="/community">Community</Link>
        //                 </Nav.Link>
        //                 <Nav.Link as="span">
        //                     <Link to="/places/create">Create places</Link>
        //                 </Nav.Link>


        //                 {
        //                     user
        //                         ?
        //                         <>
        //                             <Nav.Link as="span" onClick={logout}>Cerrar sesion</Nav.Link>

        //                             <Nav.Link as="span">
        //                                 <Link to={`/profile/${user._id}`}>Hola {user.name}</Link>
        //                             </Nav.Link>

        //                         </>
        //                         :
        //                         <>
        //                             <Nav.Link as="span">
        //                                 <Link to="/login">Login</Link>
        //                             </Nav.Link>

        //                             <Nav.Link as="span">
        //                                 <Link to="/signup">Singup</Link>
        //                             </Nav.Link>
        //                         </>
        //                 }






        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )
}
export default Navigation