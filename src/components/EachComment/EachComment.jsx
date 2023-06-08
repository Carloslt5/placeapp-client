import { Card, Row, Col, Button } from 'react-bootstrap'
import './EachComment.css'
import { useEffect, useState, useContext } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from '../../contexts/message.context'
import usersService from './../../services/users.services'
import commentsService from './../../services/comment.services'
import Loader from '../Loader/Loader'
import { MESSAGES_UPDATE_COMMENT, MESSAGES_DELETE_COMMENT } from '../../consts/messages-consts'


const EachComment = ({ comment: { _id, content, owner, createdAt, updateAt }, updateComments }) => {

    const { emitMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)

    const [userData, setUserData] = useState()
    const [isEditing, setEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(content)


    useEffect(() => {
        loaderUser()
    }, [])

    const loaderUser = () => {
        usersService
            .getOneUser(owner)
            .then(({ data }) => {
                setUserData(data)
            })
            .catch(err => console.log(err))
    }

    const handleEditClick = () => {
        setEditing(true)
    }

    const handleSaveClick = () => {
        setEditing(false)

        commentsService
            .editComment(_id, editedContent)
            .then(({ data }) => {
                updateComments()
                emitMessage(MESSAGES_UPDATE_COMMENT)
            })
            .catch(err => console.log(err))

    }

    const handleCancelClick = () => {
        setEditing(false)
        setEditedContent(content)
    }

    const handlerDelete = () => {

        commentsService
            .deteleComment(_id)
            .then(({ data }) => {
                updateComments()
                emitMessage(MESSAGES_DELETE_COMMENT)

            })
            .catch(err => console.log(err))

    }


    const handleInputChange = e => {
        setEditedContent(e.target.value)
    }


    return (
        <>


            {
                !userData
                    ?
                    <Loader md={{ offset: 3, span: 6 }} />
                    :

                    <Card className='p-3 my-5'>
                        <Row>

                            <Col md={{ span: 1 }} >
                                <Link to={`/profile/${userData._id}`} >
                                    <img className='rounded-circle avatar-comment' src={userData.avatar} alt="" />
                                </Link>
                            </Col>
                            <Col className='d-flex flex-column justify-content-between'>
                                <article>
                                    <p><strong> {userData.name} {userData.lastName}</strong></p>
                                    <hr />

                                </article>
                                {
                                    !isEditing
                                        ?
                                        <>
                                            <p>{content}</p>

                                            {
                                                user._id === owner &&

                                                <div className="gap-2 d-flex justify-content-end mt-2 ">
                                                    <Button className='btnEdit' onClick={handleEditClick}> Edit</Button>
                                                    <Button className='btnDelete' onClick={handlerDelete}>Delete</Button>
                                                </div>

                                            }

                                        </>
                                        :
                                        <>
                                            <input type="text" value={editedContent} onChange={handleInputChange} className="form-control" />

                                            {
                                                user._id === owner &&

                                                <div className="gap-2 d-flex justify-content-end mt-2">
                                                    <Button onClick={handleSaveClick}>Save</Button>
                                                    <Button className='btnDelete' onClick={handleCancelClick}>Cancel</Button>
                                                </div>
                                            }

                                        </>

                                }

                            </Col>

                        </Row>

                    </Card>


            }

        </>
    )
}

export default EachComment