
import { Form, Button } from "react-bootstrap"
import commentsService from "../../services/comment.services"
import { useState } from "react"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import placesService from "../../services/places.services"
import commentsService from "../../services/comment.services"



const CreateCommentForm = ({ updateComments }) => {

    const { user } = useContext(AuthContext)

    const { id } = useParams()

    const [commentData, setCommentData] = useState({
        content: '',
        owner: user._id
    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setCommentData({ ...commentData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        commentsService
            .createComment(commentData)
            .then(({ data }) => { return data })
            .then((data) => {

                placesService
                    .editPlace(id, { comment: data })
                    .then(({ data }) => {
                        updateComments()
                        setCommentData({
                            content: '',
                            owner: user._id
                        })
                    })
            })
            .catch(err => console.log(err))

    }

    return (

        <Row className="mt-5">
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Escribe aqui tu comentario:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="content" onChange={handleInputChange} value={commentData.content} />
                </Form.Group>

                <div className="d-grid mt-3">
                    <Button variant="dark" type="submit">Create Comment</Button>
                </div>

            </Form>
        </Row>


    )
}


export default CreateCommentForm




