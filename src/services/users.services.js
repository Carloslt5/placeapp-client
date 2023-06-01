import axios from 'axios'

class UsersService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
    }


    getOneUser(id) {
        return this.api.get(`/${id}`)
    }

    editUser(id, editData) {
        return this.api.put(`/${id}/edit`, editData)
    }


}

const usersService = new UsersService()

export default usersService

