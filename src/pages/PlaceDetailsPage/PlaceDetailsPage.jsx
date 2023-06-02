import { Container, Form, Row } from 'react-bootstrap'
import './PlaceDetailsPage.css'
import placesService from './../../services/places.services'
import usersService from './../../services/users.services'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import DetailsPlace from '../../components/DetailsPlace/DetailsPlace'





const PlaceDetailsPage = () => {

    const { id } = useParams()

    const [placeData, setPlaceData] = useState()
    // const [ownerPlaceData, setOwnerPlaceData] = useState()
    console.log("todo con el OWNER YA POPULADO", placeData)
    //Se puede pasar una propiedad de un estado para hacer una busqueda en otro servicio que actualiza otro estado?

    useEffect(() => {
        loadPlaceDetails()
        // loadOwnerPlace()
    }, [])

    const loadPlaceDetails = () => {
        placesService
            .getDetailsPlace(id)
            .then(({ data }) => setPlaceData(data))
            .catch(err => console.log(err))
    }


    // const loadOwnerPlace = () => {
    //     usersService
    //         .getOneUser(placeData.owner)
    //         .then(({ data }) => setOwnerPlaceData(data))
    //         .catch(err => console.log(err))
    // }


    return (
        <>

            <Container>
                <h1>place details page 🫂 🙃</h1>
                <Row>
                    {
                        !placeData
                            ?
                            <p>cargando</p>
                            :
                            <DetailsPlace placeData={placeData} />
                    }

                </Row>

            </Container>


        </>


    )
}

export default PlaceDetailsPage