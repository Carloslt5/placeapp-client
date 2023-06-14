import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { MessageContext } from '../../contexts/message.context'
import placesService from './../../services/places.services'
import FormError from "../FormError/FormError"
import { PLACES_TYPE_ARRAY } from '../../consts/places-consts'



const EditPlaceForm = ({ _id, name, description, photoReference, type, phone, weekDay, addressComponents, userRating, userOpinion, owner, comments }) => {

    const [placeData, setPlaceData] = useState({
        type: type,
        userRating: userRating,
        userOpinion: userOpinion
    })

    const [loadingDataPlace, setLoadingDataPlace] = useState(false)
    const [errors, setErrors] = useState([])

    const { emitMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        loadPlace()
    }, [])


    const loadPlace = () => {

        setLoadingDataPlace(true)

        placesService
            .editPlace(_id, placeData)
            .then(({ data }) => {
                setPlaceData(data)
                setLoadingDataPlace(false)
            })
            .catch(err => {
                emitMessage("Not Authorized!")
                setErrors(err.response.data.errorMessages)
                err.response.data.errorMessages && navigate('/')
                setLoadingDataPlace(false)
            })
    }

    const handleInputChange = event => {
        const { name, value } = event.target
        setPlaceData({ ...placeData, [name]: value })
    }

    const handleSubmit = event => {

        event.preventDefault()

        placesService
            .editPlace(_id, placeData)
            .then(({ data }) => {
                setPlaceData(data)
                navigate(`/places/${_id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            <Container>
                <Row className="justify-content-center">
                    <Col md={{ span: 10 }} className='mb-4'>
                        <h3 style={{ textAlign: 'center' }}> {name}</h3>
                    </Col>
                    <Col md={{ span: 10 }}>
                        <Card className="p-4">
                            <Form onSubmit={handleSubmit}>

                                {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}

                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="description" value={description} disabled />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="photoReference" hidden>
                                    <Form.Label>Photo Reference</Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="photoReference" value={photoReference} disabled />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="weekDay" hidden>
                                    <Form.Label>Week Day</Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="weekDay" value={weekDay} disabled />
                                </Form.Group>

                                <Row>
                                    <Col >
                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" onChange={handleInputChange} name="address" value={addressComponents.address} disabled />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" onChange={handleInputChange} name="city" value={addressComponents.city} disabled />
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="phone">
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="text" onChange={handleInputChange} name="phone" value={phone} disabled />
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row>

                                    <Col >
                                        <Form.Group className="mb-3" controlId="latitude" hidden>
                                            <Form.Label>Latitude</Form.Label>
                                            <Form.Control type="text" onChange={handleInputChange} name="latitude" value={addressComponents.location.coordinates[0]} disabled />
                                        </Form.Group>
                                    </Col>

                                    <Col >
                                        <Form.Group className="mb-3" controlId="longitude" hidden>
                                            <Form.Label>Longitude</Form.Label>
                                            <Form.Control type="text" onChange={handleInputChange} name="longitude" value={addressComponents.location.coordinates[1]} disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Type:</Form.Label>

                                    <Form.Select aria-label="Default select example" onChange={handleInputChange} name="type" >
                                        <option>Select type...</option>

                                        {
                                            PLACES_TYPE_ARRAY.map(elm => <option key={elm} value={elm}>{elm}</option>)
                                        }

                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="userRating">
                                    <Form.Label>Your Rating</Form.Label>
                                    <Form.Control type="number" onChange={handleInputChange} name="userRating" value={placeData.userRating} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="userOpinion">
                                    <Form.Label>Your Opinion</Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="userOpinion" value={placeData.userOpinion} />
                                </Form.Group>


                                <div className="d-grid mt-4">
                                    <Button variant="dark" disabled={loadingDataPlace} type="submit"> {loadingDataPlace ? 'loading data place...' : 'Update Place'}</Button>
                                </div>

                            </Form>
                        </Card>
                    </Col>
                </Row>

            </Container >

        </>

    )

}


export default EditPlaceForm