
import { Form, Button, Row } from "react-bootstrap"
import './CreateCommentForm.css'
import { useState, useContext } from "react"
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
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
            .then(({ data }) => commentsService.addCommentToPlace(id, data._id))
            .then(() => {
                updateComments()
                setCommentData({
                    content: '',
                    owner: user._id
                })
            })
            .catch(err => console.log(err))

    }

    return (

        <Row className="mt-5">
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={3} name="content" onChange={handleInputChange} value={commentData.content} placeholder="Write your opinion" />
                </Form.Group>

                <div className="d-flex justify-content-end mt-3">
                    <Button className="btnBlue" type="submit">Create Comment</Button>
                </div>

            </Form>
        </Row>

    )
}


export default CreateCommentForm




