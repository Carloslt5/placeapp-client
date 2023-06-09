import { Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
        if (query === "All places") {
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

                                <Col sm={6} md={4} key={place._id} className='mb-4'>
                                    <Link to={`/places/${place._id}`}>
                                        <EachPlace {...place} />
                                    </Link>
                                </Col>

                            )
                        })
                }

            </Row>
        </Container>


    )
}


export default AllPlacesPage