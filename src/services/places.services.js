import axios from 'axios'

class PlacesService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/places`
        })
    }


    getAllPlaces() {
        return this.api.get('/getAllPlaces')
    }

    createPlace(placeData) {
        return this.api.post(`/createPlace`, placeData)
    }

    getOnePlace(placeId) {
        return this.api.get(`/getOnePlace/${placeId}`)
    }

    editPlace(placeId, placeData) {
        return this.api.put(`${placeId}/edit`, placeData)
    }

    addFavouritesPlace(placeIdFavourite) {
        return this.api.post(`${placeIdFavourite}/favourites`)
    }

    deletePlace(placeIdDelete) {
        return this.api.delete(`${placeIdDelete}/delete`)
    }


}

const placesService = new PlacesService()

export default placesService

