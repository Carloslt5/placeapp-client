import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import './DetailsPlace.css'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import placesService from './../../services/places.services'


const DetailsPlace = ({ _id, name, description, photoReference, type, phone, weekDay, addressComponents, userRating, userOpinion, owner, comments }) => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()

    const [isFavourite, setIsFavourite] = useState(false)

    const navigate = useNavigate()

    const deleteHandler = () => {

        placesService
            .deletePlace(id)
            .then(() => { navigate(`/`) })
            .catch(err => console.log(err))

    }

    const handlerFavourite = () => {
        setIsFavourite(true)
        placesService
            .addFavouritesPlace(id, user)
            .then(({ data }) => {
                console.log('esa la data que recibo en el front', data)
            })
            .catch(err => console.log(err))
    }

    const handlerRemoveFavourite = () => {
        setIsFavourite(false)

        placesService
            .removeFavouritesPlace(id, user)
            .then(({ data }) => {
                console.log('esa la data que recibo en el front', data)
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <Card className='mb-4'>
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
                                                weekDay.map((eachDay, index) => (
                                                    <p key={index}>{eachDay}</p>
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

                                    {
                                        (user._id === owner._id || user.role === "ADMIN") &&

                                        <>
                                            <Button variant="dark" href={`/places/${_id}/edit`}>Edit</Button>
                                            <Button variant="danger" onClick={deleteHandler}> Delete</Button>
                                        </>


                                    }
                                    <>
                                        {
                                            isFavourite ?
                                                <Button variant="danger" onClick={handlerRemoveFavourite}>Remove Favourites</Button>
                                                :
                                                <Button variant="warning" onClick={handlerFavourite}>Add Favourites</Button>
                                        }
                                    </>

                                </div>

                                {
                                    owner
                                        ?
                                        <p>Owner: {owner.name} {owner.lastName} </p>
                                        :
                                        <p>no hay owner </p>
                                }

                            </Col>
                        </Row>

                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}


export default DetailsPlace