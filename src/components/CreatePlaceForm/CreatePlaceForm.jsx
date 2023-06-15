
import { Form, Button, Row, Col, Card } from "react-bootstrap"
import './CreatePlaceForm.css'
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from '../../contexts/message.context'
import placesService from './../../services/places.services'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import FormError from "../FormError/FormError"
import { PLACES_TYPE_ARRAY } from '../../consts/places-consts'


const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

const CreatePlaceForm = () => {

    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const [address, setAddress] = useState()
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const [placesData, setplacesData] = useState({
        placeId: '',
        name: '',
        description: '',
        placeImg: '',
        photoReference: '',
        type: '',
        phone: '',
        weekDay: '',
        city: '',
        address: '',
        latitude: '',
        longitude: '',
        userRating: '',
        userOpinion: '',
        owner: '',
        comments: '',
    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setplacesData({ ...placesData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        placesService
            .createPlace(placesData)
            .then(({ data }) => {
                emitMessage("Place created!")
                navigate(`/profile/${user._id}`)
                // updateList()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleChange = (newAddress) => setAddress(newAddress)

    const handleSelect = (selectedAddress) => {
        setAddress(selectedAddress)

        geocodeByAddress(selectedAddress)
            .then((results) => {
                const { place_id } = results[0]
                return placesService.getOnePlace(place_id)
            })
            .then(({ data }) => {
                setplacesData(placesData => ({
                    ...placesData,
                    placeId: data.placeId,
                    name: address,
                    description: data.description,
                    placeImg: data.placeImg,
                    photoReference: data.photoReference,
                    type: data.type,
                    phone: data.phone,
                    weekDay: data.weekDay,
                    city: data.city,
                    address: data.address,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    userRating: data.userRating,
                    userOpinion: data.userOpinion,
                    owner: user._id,
                    comments: data.comments
                }))

            })
            .catch(err => console.log(err))

    }

    return (

        <Row className="justify-content-center">
            <Col md={{ span: 10 }}>
                <Card className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label><strong>Place name</strong></Form.Label>

                        <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} name='name' apiKey={apiKey} controlId="name">
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <Form.Group>
                                    <input  {...getInputProps({ placeholder: 'Enter a location' })} />

                                    <div>
                                        {loading && <div>Cargando...</div>}
                                        {suggestions.map((suggestion, index) => (
                                            <div key={index} {...getSuggestionItemProps({ suggestion })}>
                                                {suggestion.description}
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>
                            )}
                        </PlacesAutocomplete>


                        <Form.Group className="my-3" controlId="description">
                            <Form.Label><strong>Description</strong></Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="description" value={placesData.description} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="photoReference"  >
                            <Form.Label><strong>Photo Reference</strong></Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="photoReference" value={placesData.photoReference} disabled />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="weekDay" >
                                    <Form.Label><strong>Week Day</strong></Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="weekDay" value={placesData.weekDay} disabled />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col >
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label><strong>Address</strong></Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="address" value={placesData.address} disabled />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label><strong>City</strong></Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="city" value={placesData.city} disabled />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label><strong>Phone</strong></Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="phone" value={placesData.phone} disabled />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>

                            <Col >
                                <Form.Group className="mb-3" controlId="latitude" hidden>
                                    <Form.Label><strong>Latitude</strong></Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="latitude" value={placesData.latitude} disabled />
                                </Form.Group>
                            </Col>

                            <Col >
                                <Form.Group className="mb-3" controlId="longitude" hidden>
                                    <Form.Label><strong>Longitude</strong></Form.Label>
                                    <Form.Control type="text" onChange={handleInputChange} name="longitude" value={placesData.longitude} disabled />
                                </Form.Group>
                            </Col>


                        </Row>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label><strong>Type:</strong></Form.Label>

                            <Form.Select aria-label="Default select example" onChange={handleInputChange} name="type" >
                                <option>Select type...</option>
                                {
                                    PLACES_TYPE_ARRAY.map(elm => <option key={elm} value={elm}>{elm}</option>)
                                }
                            </Form.Select>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userRating">
                            <Form.Label><strong>Your Rating</strong></Form.Label>
                            <Form.Control type="number" onChange={handleInputChange} name="userRating" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userOpinion">
                            <Form.Label><strong>Your Opinion</strong></Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="userOpinion" />
                        </Form.Group>

                        {errors.length > 0 && <FormError>{errors.map((elem, index) => <p key={index} className="my-0">{elem}</p>)}</FormError>}

                        <div className="d-grid mt-5">
                            <Button className='btn' type="submit">Create Place</Button>
                        </div>

                    </Form>
                </Card>
            </Col>
        </Row>

    )
}

export default CreatePlaceForm
