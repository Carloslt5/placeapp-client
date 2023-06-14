import { Card, Col, ListGroup, Row, Button } from 'react-bootstrap'
import './DetailsPlace.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import placesService from './../../services/places.services'
import usersService from './../../services/users.services'
import MapsPage from '../MapsPage/MapsPage'


const DetailsPlace = ({ _id, name, description, photoReference, type, phone, weekDay, addressComponents, userRating, userOpinion, owner, comments }) => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()

    const [isFavourite, setIsFavourite] = useState(false)


    useEffect(() => {

        usersService
            .getOneUser(user?._id)
            .then(({ data }) => data.favouritePlaces.some(elm => elm._id === _id) ? setIsFavourite(true) : setIsFavourite(false))
            .catch(err => console.log(err))

    }, [user, user?._id])


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
                        <Col sm={12} md={6}>
                            <Card.Title ><strong>{name}</strong></Card.Title>

                        </Col>
                        <Col sm={12} md={6}>
                            {
                                owner
                                    ?
                                    <Link to={`/profile/${owner._id}`}>
                                        <Row className='justify-content-end align-items-center '>

                                            <Col style={{ textAlign: 'end' }} >
                                                <strong>Created by:</strong>
                                                <p className='m-0'>{owner.name} {owner.lastName}</p>
                                            </Col>
                                            <Col xs={3} md={2}>
                                                <img className='rounded-circle' src={owner.avatar}></img>
                                            </Col>

                                        </Row>
                                    </Link>
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
                                <Card.Title><strong> Owner`s Opinion:</strong></Card.Title>
                                <p className='py-2 mb-4'> {userOpinion}</p>
                                <Card.Title className='mb-4'><strong> Rating:</strong> {userRating}</Card.Title>

                                <div className="gap-2 d-flex justify-content-between">

                                    <article>
                                        {
                                            isFavourite ?
                                                <Button className='btnRemoveFavourite ' onClick={handlerRemoveFavourite}  >
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </Button>
                                                :
                                                <Button className='btnFavourite' onClick={handlerFavourite} >
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </Button>
                                        }
                                    </article>

                                    <article className='d-flex gap-2'>
                                        {
                                            (user._id === owner._id || user.role === "ADMIN") &&

                                            <>
                                                <Button>
                                                    <Link to={`/places/${_id}/edit`}>
                                                        <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
                                                        Edit
                                                    </Link>
                                                </Button>

                                                <Button onClick={deleteHandler}>
                                                    <FontAwesomeIcon icon={faTrash} className='me-2' />
                                                    Delete
                                                </Button>
                                            </>

                                        }
                                    </article>
                                </div>



                            </Col>
                        </Row>

                    </Card.Text>

                </Card.Body>
            </Card >

        </>
    )
}


export default DetailsPlace