import './ProfileContent.css'
import { Row, Card, Col, Nav, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileContent = ({ userPlacesData }) => {

    return (

        <Card>
            <Card.Header>
                <Nav variant="pills" defaultActiveKey="#first">

                    <Nav.Item>
                        <Nav.Link href="#first">
                            <Link to="/profile/:id/myplaces">My places</Link>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#link">My favourites</Nav.Link>
                    </Nav.Item>

                </Nav>
            </Card.Header>

            <Card.Body>
                <Row>
                    {

                        userPlacesData.map(userPlace => {
                            return (

                                <Col xs={12} md={4} >
                                    <Card>
                                        <Card.Img variant="top" src={userPlace.photoReference[0]} />
                                        <Card.Body>
                                            <Card.Title>{userPlace.name}</Card.Title>
                                            <Card.Text>
                                                <p> Description: {userPlace.description} </p>
                                                <p>  Type: {userPlace.type} </p>
                                                <p>  Phone: {userPlace.phone}</p>
                                                <p>  WeekDay: {userPlace.weekDay[0]}</p>
                                                <p>  City: {userPlace.addressComponents.city}</p>
                                                <p>  address: {userPlace.addressComponents.address}</p>
                                                <p>  latitude: {userPlace.addressComponents.location.coordinates[0]}</p>
                                                <p>  longitude: {userPlace.addressComponents.location.coordinates[0]}</p>
                                                <p>  Your Rating: {userPlace.userRating}</p>
                                                <p>  Your Opinion: {userPlace.userOpinion}</p>

                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Link href="#">Card Link</Card.Link>
                                            <Card.Link href="#">Another Link</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })
                    }
                </Row>

            </Card.Body>

        </Card>

    )
}

export default ProfileContent