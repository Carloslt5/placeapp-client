
import './CreatePlaceForm.css'
import { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import placesService from './../../services/places.services'

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const CreatePlaceForm = () => {

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
            .createPlace()
            .then(() => {
                console.log('esto es la respuesta de create place')
                // closeModal()
                // updateList()
            })
            .catch(err => console.log(err))
    }

    // ------------------------
    const [address, setAddress] = useState()

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleSelect = (selectedAddress) => {

        setAddress(selectedAddress);

        geocodeByAddress(selectedAddress)
            .then((results) => {
                const place_id = (results[0].place_id)
                return placesService.getOnePlace(place_id)
            })
            .then(({ data }) => {
                console.log("HORARIO-----", data.current_opening_hours.weekday_text)
                setplacesData(placesData => ({
                    ...placesData,
                    placeId: data.place_id,
                    name: data.name,
                    description: data.editorial_summary.overview,
                    placeImg: '',
                    photoReference: '',
                    type: '',
                    phone: data.international_phone_number,
                    weekDay: data.current_opening_hours.weekday_text,
                    city: data.address_components[2].long_name,
                    address: data.formatted_address,
                    latitude: data.geometry.location.lat,
                    longitude: data.geometry.location.lng,
                    userRating: '',
                    userOpinion: '',
                    owner: '',
                    comments: '',
                }));
                console.log('resultado del then', placesData.city);
            })
            .catch(err => console.log(err))

    };

    // ------------------------

    return (
        <>
            <p>formulario</p>
            <Container>

                <Form onSubmit={handleSubmit}>

                    {/* //meter vaue con lo que nos devuelve la api */}
                    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} apiKey={apiKey} className="mb-3" controlId="name">
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

                    {/* aqui podra subir imagen propia el usuario */}
                    {/* <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="photoReference">
                        <Form.Label>Photo Reference</Form.Label>
                        <Form.Control type="text" onChange={handleInputChange} name="photoReference" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Type:</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={handleInputChange} name="type" >
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
