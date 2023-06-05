import { Form, Row } from 'react-bootstrap'
import './FilteringPlaces.css'

const FilteringPlaces = ({ filterPlacesByType }) => {

    const handleClick = (e) => {
        const checkValue = e.target.name
        filterPlacesByType(checkValue)
    }

    return (
        <>
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Night" onClick={handleClick} name="Night"
            />

            {/* <Form.Check type="radio" label="Night" onClick={handleClick} name="Night" />
            <Form.Check type="radio" label="Parks and gardens" onClick={handleClick} name="Parks and gardens" />
            <Form.Check type="radio" label="Bar" onClick={handleClick} name="Bar" />
            <Form.Check type="radio" label="Restaurant" onClick={handleClick} name="Restaurant" />
            <Form.Check type="radio" label="Theatre" onClick={handleClick} name="Theatre" />
            <Form.Check type="radio" label="Cinema" onClick={handleClick} name="Cinema" />
            <Form.Check type="radio" label="Exposition" onClick={handleClick} name="Exposition" />
            <Form.Check type="radio" label="Interest" onClick={handleClick} name="Interest" /> */}

        </>
    )
}

export default FilteringPlaces