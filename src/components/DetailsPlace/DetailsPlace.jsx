import './DetailsPlace.css'
import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import placesService from './../../services/places.services'
import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm'


const DetailsPlace = ({ _id, name, description, photoReference, type, phone, weekDay, addressComponents, userRating, userOpinion, owner, comments }) => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()

    const handlerFavourite = () => {

        placesService
            .addFavouritesPlace(id, user)
            .then(({ data }) => {
                console.log('esa la data que recibo en el front', data)
            })

    }

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
                                <Button variant="warning" onClick={handlerFavourite}>
                                    Add Favourites
                                </Button>

                            </div>
                            <p>Owner:</p>

                            <p> {owner ? owner.name && owner.lastName : "no hay owner name"} </p>

                            {/* <img src={owner} alt="" /> */}








                            <p>comments: {comments}</p>
                            <CreateCommentForm />


                        </Col>
                    </Row>





                </Card.Text>

            </Card.Body>
        </Card>
    )
}
export default DetailsPlace