
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import './CreatePlaceForm.css'
import { AuthContext } from '../../contexts/auth.context';
import { useContext } from 'react';
import { useState } from "react"
import placesService from './../../services/places.services'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const CreatePlaceForm = () => {

    const { user } = useContext(AuthContext)

    const [address, setAddress] = useState()

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
            .then((place) => {
                console.log('Sitio creado con exito!', place)
                // closeModal()
                // updateList()
            })
            .catch(err => console.log(err))
    }

    const handleChange = (newAddress) => setAddress(newAddress)

    const handleSelect = (selectedAddress) => {
        setAddress(selectedAddress);

        geocodeByAddress(selectedAddress)
            .then((results) => {
                const place_id = (results[0].place_id)
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
                }));

            })
            .catch(err => console.log(err))

    };

    return (
        <>
            <Container>

                <Form onSubmit={handleSubmit}>

                    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} name='name' apiKey={apiKey} className="mb-3" controlId="name">
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <Form.Group>

                                <input  {...getInputProps({ placeholder: 'Ingresa un lugar' })} />

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


                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="description" value={placesData.description} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="photoReference"  >
                        <Form.Label>Photo Reference</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="photoReference" value={placesData.photoReference} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Type:</Form.Label>

                        <Form.Select aria-label="Default select example" multiply onChange={handleInputChange} name="type" >
                            <option>Select type...</option>
                            <option value="Night">Night</option>
                            <option value="Parks and gardens">Parks and gardens</option>
                            <option value="Bar">Bar</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Theatre">Theatre</option>
                            <option value="Cinema">Cinema</option>
                            <option value="Exposition">Exposition</option>
                            <option value="Interest point">Interest point</option>
                        </Form.Select>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="phone" value={placesData.phone} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="weekDay">
                        <Form.Label>Week Day</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="weekDay" value={placesData.weekDay} />
                    </Form.Group>

                    <Row>
                        <Col >
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" onChange={handleInputChange} name="address" value={placesData.address} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" onChange={handleInputChange} name="city" value={placesData.city} />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>

                        <Col >
                            <Form.Group className="mb-3" controlId="latitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control type="text" onChange={handleInputChange} name="latitude" value={placesData.latitude} />
                            </Form.Group>
                        </Col>

                        <Col >
                            <Form.Group className="mb-3" controlId="longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control type="text" onChange={handleInputChange} name="longitude" value={placesData.longitude} />
                            </Form.Group>
                        </Col>


                    </Row>

                    <Form.Group className="mb-3" controlId="userRating">
                        <Form.Label>Your Rating</Form.Label>
                        <Form.Control type="number" onChange={handleInputChange} name="userRating" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userOpinion">
                        <Form.Label>Your Opinion</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="userOpinion" />
                    </Form.Group>

                    <div className="d-grid mt-3">
                        <Button variant="dark" type="submit">Create Place</Button>
                    </div>

                </Form>
            </Container>

        </>
    )
}

export default CreatePlaceForm
