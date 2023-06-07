import { Col, Container, Row, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import placesService from './../../services/places.services'
import EachPlace from "../../components/EachPlace/EachPlace"
import Loader from '../../components/Loader/Loader'
import FilteringPlaces from '../../components/FilteringPlaces/FilteringPlaces'


const AllPlacesPage = () => {

    const [placesData, setPlacesData] = useState()
    const [placesDataBackup, setPlacesDataBackup] = useState()

    useEffect(() => {
        loadUserPlaces()
    }, [])

    const loadUserPlaces = () => {
        placesService
            .getAllPlaces()
            .then(({ data }) => {
                setPlacesData(data)
                setPlacesDataBackup(data)
            })
            .catch(err => console.log(err))
    }

    // TODO OPCIONAL: FILTRAR EN SERVIDOR
    const filterPlacesByType = query => {
        if (query === "All") {
            setPlacesData(placesDataBackup)
        } else {
            const filteredPlaces = placesDataBackup.filter(elm => elm.type.includes(query))
            setPlacesData(filteredPlaces)
        }
    }


    return (

        <Container>

            <FilteringPlaces filterPlacesByType={filterPlacesByType} />

            <Row className='justify-content-center mt-5'>

                {
                    !placesData
                        ?
                        <Col>
                            <Loader md={{ offset: 3, span: 6 }} />
                        </Col>
                        :
                        placesData.map((place) => {
                            return (

                                <Col sm={6} md={6} key={place._id} className='mb-4'>
                                    <EachPlace {...place} />
                                </Col>

                            )
                        })
                }

            </Row>
        </Container>


    )
}


export default AllPlacesPage