import axios from 'axios'

class GroupServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/groups`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    getAllGroups() {
        return this.api.get(`/`)
    }

    getOneGroup(groupId) {
        return this.api.get(`/${groupId}`, groupId)
    }

    createGroup(dataGroup) {
        return this.api.post(`/create`, dataGroup)
    }

    joinGroup(groupId) {
        return this.api.put(`/${groupId}/join`)
    }

    unJoinGroup(groupId) {
        return this.api.put(`/${groupId}/unjoin`)
    }

    deleteGroup(groupId) {
        return this.api.delete(`/${groupId}/delete`)
    }


}

const groupsService = new GroupServices()

export default groupsService

