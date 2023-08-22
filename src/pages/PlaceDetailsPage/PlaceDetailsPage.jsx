import { Container } from 'react-bootstrap'
import './PlaceDetailsPage.css'
import { useCallback, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import placesService from './../../services/places.services'
import DetailsPlace from '../../components/DetailsPlace/DetailsPlace'
import Loader from '../../components/Loader/Loader'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import CommentsList from '../../components/CommentsList/CommentsList'


const PlaceDetailsPage = () => {

  const { id } = useParams()

  const [placeData, setPlaceData] = useState()


  const loadPlaceDetails = useCallback(() => {
    placesService
      .getDetailsPlace(id)
      .then(({ data }) => setPlaceData(data))
      .catch(err => console.log(err))
  }, [id])

  useEffect(() => {
    loadPlaceDetails()
  }, [loadPlaceDetails])

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

      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAirnevs0SFUHkMNgNV7xEX49GkuwqE_XM&libraries=places" async defer></script>

    </>

  )
}


export default PlaceDetailsPage