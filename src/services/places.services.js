import axios from 'axios'

class PlacesService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/places`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    getAllPlaces() {
        return this.api.get('/getAllPlaces')
    }

    getUserPlaces(user_id) {
        return this.api.get(`/${user_id}/getUserPlaces`)
    }

    getDetailsPlace(place_id) {
        return this.api.get(`/${place_id}/getDetailsPlace`)
    }

    createPlace(placeData) {
        return this.api.post(`/createPlace`, placeData)
    }

    getOnePlace(placeId) {
        return this.api.get(`/getOnePlace/${placeId}`)
    }

    editPlace(place_id, placeData) {
        return this.api.put(`/${place_id}/edit`, placeData)
    }

    addFavouritesPlace(placeIdFavourite, userId) {
        return this.api.put(`/${placeIdFavourite}/favourites`, userId)
    }

    deletePlace(placeIdDelete) {
        return this.api.delete(`/${placeIdDelete}/delete`)
    }


}

const placesService = new PlacesService()

export default placesService

