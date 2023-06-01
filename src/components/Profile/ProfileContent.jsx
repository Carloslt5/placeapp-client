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


    )
}

export default ProfileContent