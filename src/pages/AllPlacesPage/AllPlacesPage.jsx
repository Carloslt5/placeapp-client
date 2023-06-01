import { useEffect, useState } from 'react'
import placesService from './../../services/places.services'
import { Col, Container, Row } from "react-bootstrap"
import EachPlace from "../../components/EachPlace/EachPlace"

const AllPlacesPage = () => {

    const [placesData, setPlacesData] = useState()

    useEffect(() => {
        loadUserPlaces()
    }, [])

    const loadUserPlaces = () => {
        placesService
            .getAllPlaces()
            .then(({ data }) => {
                setPlacesData(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container>
                <h1 className="my-3">All Places</h1>
                <Row>

                    {
                        !placesData
                            ?
                            <h2>Cargando.....</h2>
                            :
                            placesData.map((place, index) => {
                                return (

                                    <Col md={3} key={index}>
                                        <EachPlace place={place} />
                                    </Col>

                                )
                            })
                    }

                </Row>
            </Container>

        </>
    )
}
export default AllPlacesPage