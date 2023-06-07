import { Form, Row } from 'react-bootstrap'
import { PLACES_TYPE_ARRAY } from '../../consts/places-consts'
import './FilteringPlaces.css'


const FilteringPlaces = ({ filterPlacesByType }) => {

    const handleChange = (e) => {
        const inputValueType = e.target.value
        filterPlacesByType(inputValueType)
    }

    return (

        <Form.Group className="mb-3" controlId="title">

            <Form.Select aria-label="Default select example" onChange={handleChange} name="type" >
                <option>Select type...</option>
                {
                    PLACES_TYPE_ARRAY.map(elm => <option key={elm} value={elm}>{elm}</option>)
                }
            </Form.Select>
        </Form.Group>

    )
}


export default FilteringPlaces