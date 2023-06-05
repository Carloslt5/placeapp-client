
import { Form, Button, Row } from "react-bootstrap"
import { useState } from "react"
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

                commentsService
                    .addCommentToPlace(id, data._id)
                    .then(({ data }) => {
                        updateComments()
                    })
            })
            .catch(err => console.log(err))

    }

    return (

        <Row className="mt-5">
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Escribe aqui tu comentario:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="content" onChange={handleInputChange} />
                </Form.Group>

                <div className="d-grid mt-3">
                    <Button variant="dark" type="submit">Create Comment</Button>
                </div>

            </Form>
        </Row>


    )
}


export default CreateCommentForm




