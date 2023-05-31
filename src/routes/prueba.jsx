import { useState } from "react"
import { Form } from "react-bootstrap"
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Prueba = () => {
    const [address, setAddress] = useState()

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleSelect = (selectedAddress) => {
        setAddress(selectedAddress);
        geocodeByAddress(selectedAddress)
            .then((results) => {
                const place_id = (results[0].place_id)
                return place_id
            })
            .catch((error) => {
                // Maneja el error
            });
    };

    return (

        <>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect} apiKey={apiKey} >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: 'Ingresa un lugar' })} />

                        <div>
                            {loading && <div>Cargando...</div>}
                            {suggestions.map((suggestion, index) => (
                                <div key={index} {...getSuggestionItemProps({ suggestion })}>
                                    {suggestion.description}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </>
    )
}
export default Prueba