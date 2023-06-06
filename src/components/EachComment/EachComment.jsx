import { Card, Row, Col, Button } from 'react-bootstrap'
import './EachComment.css'
import { useEffect, useState } from "react"
import Loader from '../Loader/Loader'
import usersService from './../../services/users.services'
import commentsService from './../../services/comment.services'
import { MessageContext } from '../../contexts/message.context'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom';

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
        setEditing(true);
    }

    const handleSaveClick = () => {
        setEditing(false)

        commentsService
            .editComment(_id, editedContent)
            .then(({ data }) => {
                updateComments()
                emitMessage("Updated comment!")
            })
            .catch(err => console.log(err))

    };

    const handleCancelClick = () => {
        setEditing(false);
        setEditedContent(content);
    }

    const handlerDelete = () => {

        commentsService
            .deteleComment(_id)
            .then(({ data }) => {
                updateComments()
                emitMessage("Deleted comment!")

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

                    <Card className='p-4 my-2'>
                        <Row>

                            <Col md={{ span: 2 }} >
                                <Link to={`/profile/${userData._id}`} >
                                    <img className='rounded-circle avatar-comment' src={userData.avatar} alt="" />
                                </Link>
                            </Col>
                            <Col>
                                <p><strong> {userData.name} {userData.lastName}</strong></p>
                                <hr />

                                {
                                    !isEditing
                                        ?
                                        <>
                                            <p>{content}</p>

                                            {
                                                user._id === owner &&

                                                <div className="d-grid gap-2 mt-2">
                                                    <Button variant="dark" onClick={handleEditClick}> Edit</Button>
                                                    <Button variant="danger" onClick={handlerDelete}>Delete</Button>
                                                </div>

                                            }

                                        </>
                                        :
                                        <>
                                            <input type="text" value={editedContent} onChange={handleInputChange} className="form-control" />

                                            {
                                                user._id === owner &&

                                                <div className="d-grid gap-2 mt-2">
                                                    <Button variant="dark" onClick={handleSaveClick}>Save</Button>
                                                    <Button variant="danger" onClick={handleCancelClick}>Cancel</Button>
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