import { Container } from 'react-bootstrap'
import './PlaceDetailsPage.css'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import placesService from './../../services/places.services'
import DetailsPlace from '../../components/DetailsPlace/DetailsPlace'
import Loader from '../../components/Loader/Loader'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import CommentsList from '../../components/CommentsList/CommentsList'


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
                {
                    !placeData
                        ?
                        <Loader md={{ offset: 3, span: 6 }} />
                        :
                        <>
                            <DetailsPlace {...placeData} />

                            <CommentsList placeData={placeData} updateComments={loadPlaceDetails} />

                            <CreateCommentForm updateComments={loadPlaceDetails} />
                        </>

                }

            </Container>


        </>

    )
}


export default PlaceDetailsPage