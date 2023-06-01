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


}

const usersService = new UsersService()

export default usersService

