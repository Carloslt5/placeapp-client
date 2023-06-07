import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import './DetailsPlace.css'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import placesService from './../../services/places.services'
import MapsPage from '../MapsPage/MapsPage'


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
                <Card.Img variant="top" src={photoReference} className='card-img-details' />
                <Card.Body>
                    <Row className=' align-items-center'>
                        <Col>
                            <Card.Title ><strong>{name}</strong></Card.Title>

                        </Col>
                        <Col>
                            {
                                owner
                                    ?
                                    <Row className='align-items-center '>

                                        <Col style={{ textAlign: 'end' }} >
                                            <strong>Created by:</strong>
                                            <p className='m-0'>{owner.name} {owner.lastName}</p>
                                        </Col>
                                        <Col md={{ span: 2 }} >
                                            <img className='rounded-circle' src={owner.avatar}></img>
                                        </Col>
                                    </Row>
                                    :
                                    <p>no hay owner </p>
                            }
                        </Col>
                    </Row>

                    <hr />

                    <Card.Text className='mt-5'>

                        <Row>
                            <Col md={6}>
                                <Card className='pt-3'>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><strong>Description:</strong> {description}</ListGroup.Item>
                                        <ListGroup.Item><strong>Address:</strong> {addressComponents.address}</ListGroup.Item>
                                        <ListGroup.Item><strong>Type:</strong> {type}</ListGroup.Item>
                                        <ListGroup.Item><strong>City:</strong> {addressComponents.city}</ListGroup.Item>
                                        <ListGroup.Item><strong>Phone:</strong> {phone}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            {
                                                weekDay.map((eachDay, index) => (<p key={index}>{eachDay}</p>))
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Row className='my-5'>
                            <MapsPage {...addressComponents} />
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Card.Title><strong>💬 Opinion:</strong></Card.Title>
                                <p className='py-2 mb-4'> {userOpinion}</p>
                                <p><strong> 🏆 Rating:</strong> {userRating}</p>

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



                            </Col>
                        </Row>

                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}


export default DetailsPlace