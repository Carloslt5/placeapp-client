import './DetailsPlace.css'
import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'


const DetailsPlace = ({ placeData: { _id, name, description, photoReference, type, phone, weekDay, addressComponents, userRating, userOpinion, owner, comments } }) => {
    return (

        <Card>
            <Card.Img variant="top" src={photoReference} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>

                    <Row>
                        <Col md={6}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Description: {description}</ListGroup.Item>
                                    <ListGroup.Item>Address: {addressComponents.address}</ListGroup.Item>
                                    <ListGroup.Item>City: {addressComponents.city}</ListGroup.Item>
                                    <ListGroup.Item>Latitude: {addressComponents.location.coordinates[0]}</ListGroup.Item>
                                    <ListGroup.Item>Longitude: {addressComponents.location.coordinates[1]}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Phone: {phone}</ListGroup.Item>
                                    <ListGroup.Item>
                                        {
                                            weekDay.map(eachDay => (
                                                <p key={eachDay}>{eachDay}</p>
                                            ))
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p>Your Rating: {userRating}</p>
                            <p>Your opinion: {userOpinion}</p>

                            <div className="d-grid gap-2">
                                <Button variant="dark" href={`/places/${_id}/edit`}>
                                    Edit
                                </Button>
                                <Button variant="danger">
                                    Delete
                                </Button>

                            </div>
                            <p>Owner:</p>
                            <p>{owner.name} {owner.lastName}</p>
                            <img src={owner.avatar} alt="" />
                            <p>comments: {comments}</p>

                        </Col>
                    </Row>





                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default DetailsPlace