import axios from 'axios'

class CommentsServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })
    }


    getAllComments(placeId) {
        return this.api.get(`/${placeId}`)
    }

    createComment(commentData) {
        return this.api.post(`/create`, commentData)
    }

    editComment(commentId, commentData) {
        return this.api.put(`/${commentId}/edit`, commentData)
    }

    deteleComment(commentId) {
        return this.api.delete(`/${commentId}/delete`, commentId)
    }


}

const commentsService = new CommentsServices()

export default commentsService

