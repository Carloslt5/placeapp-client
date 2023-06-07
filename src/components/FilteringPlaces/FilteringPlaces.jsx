import { Form, Row } from 'react-bootstrap'
import './FilteringPlaces.css'


const FilteringPlaces = ({ filterPlacesByType }) => {

    const handleChange = (e) => {
        const inputValueType = e.target.value
        filterPlacesByType(inputValueType)
    }

    return (

        <Form.Group className="mb-3" controlId="title">
            <Form.Label>Type:</Form.Label>

            <Form.Select aria-label="Default select example" onChange={handleChange} name="type" >
                <option>Select type...</option>
                <option value="All">All Places</option>
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

    )
}


export default FilteringPlaces