import { useEffect, useState } from 'react'
import placesService from './../../services/places.services'
import { Col, Container, Row } from "react-bootstrap"
import EachPlace from "../../components/EachPlace/EachPlace"
import Loader from '../../components/Loader/Loader'

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
                <h1 >All Places</h1>
                <Row className='justify-content-center'>

                    {
                        !placesData
                            ?
                            <Col>
                                <Loader md={{ offset: 3, span: 6 }} />
                            </Col>
                            :
                            placesData.map((place) => {
                                return (

                                    <Col md={3} key={place._id} className='mb-3'>
                                        <EachPlace {...place} />
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