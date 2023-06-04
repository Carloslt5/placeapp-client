import { Container, Form, Row } from 'react-bootstrap'
import './PlaceDetailsPage.css'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import placesService from './../../services/places.services'
import DetailsPlace from '../../components/DetailsPlace/DetailsPlace'
import Loader from '../../components/Loader/Loader'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import EachComment from '../../components/EachComment/EachComment'


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

            <h1>place details page 🫂 🙃</h1>

            <Container>
                {
                    !placeData
                        ?
                        <Loader md={{ offset: 3, span: 6 }} />
                        :
                        <>
                            <DetailsPlace {...placeData} />

                            <h2>Comentarios 💦</h2>
                            {
                                placeData.comments.map(comment => {

                                    return (

                                        < EachComment comment={comment} updateComments={loadPlaceDetails} />
                                    )
                                })
                            }

                            <CreateCommentForm updateComments={loadPlaceDetails} />
                        </>

                }

            </Container>


        </>


    )
}

export default PlaceDetailsPage