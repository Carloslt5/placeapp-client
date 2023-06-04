
import { Form, Button, Row, Col } from "react-bootstrap"
import commentsService from "../../services/comment.services"
import { useState } from "react"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import placesService from "../../services/places.services"



const CreateCommentForm = () => {

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
            .then(({ data }) => {
                return data
                //closeModal()
                //updateList()
            })
            .then((data) => {
                placesService
                    .editPlace(id, { comment: data })
                    .then(({ data }) => {
                        console.log("ESTO ES LO QUE RECIBO EN MI EDITPLACE------>", data)
                    })
            })
            .catch(err => console.log(err))



    }
    return (
        // <h1>crear comentario</h1>


        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Escribe aqui tu comentario:</Form.Label>
                <Form.Control as="textarea" rows={3} name="content" onChange={handleInputChange} />
            </Form.Group>

            <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Create Comment</Button>
            </div>
        </Form>


    )
}


export default CreateCommentForm




