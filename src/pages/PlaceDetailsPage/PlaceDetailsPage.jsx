import { Container, Row } from 'react-bootstrap'
import './PlaceDetailsPage.css'
import placesService from './../../services/places.services'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import DetailsPlace from '../../components/DetailsPlace/DetailsPlace'
import Loader from '../../components/Loader/Loader'



const PlaceDetailsPage = () => {

    const { id } = useParams()

    const [placeData, setPlaceData] = useState()

    useEffect(() => {
        loadPlaceDetails()
    }, [])

    const loadPlaceDetails = () => {
        placesService
            .getDetailsPlace(id)
            .then(({ data }) => setPlaceData(data))
            .catch(err => console.log(err))
    }


    return (
        <>

            <Container>
                <h1>place details page 🫂 🙃</h1>

                <Row>
                    {
                        !placeData
                            ?
                            <Loader md={{ offset: 3, span: 6 }} />
                            :
                            <DetailsPlace {...placeData} />
                    }

                </Row>

            </Container>


        </>


    )
}

export default PlaceDetailsPage