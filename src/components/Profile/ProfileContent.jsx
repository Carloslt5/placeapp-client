import './ProfileContent.css'
import { Button, Card, Col, Nav } from 'react-bootstrap';
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'


const ProfileContent = () => {

    const { user } = useContext(AuthContext)

    return (

        <Card>
            <Card.Header>
                <Nav variant="pills" defaultActiveKey="#first">

                    <Nav.Item>
                        <Nav.Link href="#first">My places</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#link">My favourites</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>

                </Nav>
            </Card.Header>

            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>

        </Card>


        // <h1>PROFILE COMPONENT</h1>
        // <div style={{ backgroundColor: 'purple' }}>

        //     <h1>Welcome , {user.name}</h1>
        //     <h1>Welcome , {user.lastName}</h1>
        //     <h1>Welcome , {user.role}</h1>
        //     <img src={user.avatar} alt="" />
        //     <h1>Welcome , {user.favouritesPlaces}</h1>

        // </div>

    )
}

export default ProfileContent