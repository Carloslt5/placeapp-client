import axios from 'axios'

class MatchServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/match`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    getMatchPlaces(profileId) {
        return this.api.get(`/${profileId}`)
    }

    getMatchPlacesGroups(groupsIds) {
        return this.api.post(`/groups`, groupsIds)
    }


}

const matchServices = new MatchServices()

export default matchServices

