import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import './Navigation.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'


const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()


    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (

        <Navbar collapseOnSelect expand="lg" className='navbarBg mb-3' sticky="top" >
            <Container>
                <Navbar.Brand href="/" className='mx-0'>Places-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mx-auto">
                        <Nav.Link as="span">
                            <Link to="/places">Places</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/community">Community</Link>
                        </Nav.Link>

                        {
                            user &&
                            <Nav.Link as="span">
                                <Link to="/places/create">Create places</Link>
                            </Nav.Link>

                        }

                        {
                            user &&
                            <Nav.Link as="span">
                                <Link to="/groups/">Groups</Link>
                            </Nav.Link>
                        }

                        {
                            user &&
                            <Nav.Link as="span">
                                <Link to="/groups/match">Groups Match</Link>
                            </Nav.Link>
                        }

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
                                    {/* TODO: MIRAR PORQUE CUANDO HACES CLICK NO VAS AL QUE CORRESPONDE */}
                                    <NavDropdown.Item >
                                        <Nav.Link as="span">
                                            <Link to={`/profile/${user._id}#myplaces`}>My places</Link>
                                        </Nav.Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item >
                                        <Nav.Link as="span">
                                            <Link to={`/profile/${user._id}#favourites`}>My favourites</Link>
                                        </Nav.Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        <Nav.Link as="span" onClick={handleLogout}>Logout</Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <Nav>

                                <Nav.Link as="span">
                                    <Link to="/signup">Singup</Link>
                                </Nav.Link>

                                <Nav.Link as="span">
                                    <Link to="/login">Login</Link>
                                </Nav.Link>

                            </Nav>

                    }

                </Navbar.Collapse>
            </Container>
        </Navbar >

    )
}


export default Navigation