import EditPlaceForm from "../../components/EditPlaceForm/EditPlaceForm"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import placesService from './../../services/places.services'



const EditPlacePage = () => {

    const { id } = useParams()

    const [placeData, setPlaceData] = useState()

    useEffect(() => {
        loaderUser()
    }, [])


    const loaderUser = () => {
        placesService
            .getDetailsPlace(id)
            .then(({ data }) => {
                setPlaceData(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            {
                !placeData
                    ?
                    <p>Loading....</p>
                    :
                    <EditPlaceForm placeData={placeData} />
            }
        </>


    )

}
export default EditPlacePage