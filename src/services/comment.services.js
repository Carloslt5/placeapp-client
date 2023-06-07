import axios from 'axios'

class CommentsServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }


    getAllComments(placeId) {
        return this.api.get(`/${placeId}`)
    }

    createComment(commentData) {
        return this.api.post(`/create`, commentData)
    }

    editComment(commentId, commentData) {
        return this.api.put(`/${commentId}/edit`, { commentId, commentData })
    }

    addCommentToPlace(placeId, commentId) {
        return this.api.put(`/${placeId}/addcomments`, { commentId })
    }

    deteleComment(commentId) {
        return this.api.delete(`/${commentId}/delete`, commentId)
    }


}

const commentsService = new CommentsServices()

export default commentsService

