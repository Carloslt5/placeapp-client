
import { Form, Button, Row } from "react-bootstrap"
import './CreateCommentForm.css'
import { useState, useContext } from "react"
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from '../../contexts/message.context'
import commentsService from "../../services/comment.services"


const CreateCommentForm = ({ updateComments }) => {

    const { emitMessage } = useContext(MessageContext)

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
                        emitMessage("Created comment!")
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




